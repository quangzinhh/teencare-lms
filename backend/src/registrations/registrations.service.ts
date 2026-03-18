import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassRegistration } from './class-registration.entity';
import { Class } from '../classes/class.entity';
import { Student } from '../students/student.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(ClassRegistration)
    private readonly registrationsRepository: Repository<ClassRegistration>,
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>,
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  async register(classId: string, payload: CreateRegistrationDto) {
    const classEntity = await this.classesRepository.findOne({
      where: { id: classId },
      relations: ['registrations'],
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    const student = await this.studentsRepository.findOne({
      where: { id: payload.studentId },
      relations: ['registrations'],
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    if (classEntity.registrations.length >= classEntity.maxStudents) {
      throw new BadRequestException('Class is full');
    }

    const existing = await this.registrationsRepository
      .createQueryBuilder('registration')
      .leftJoinAndSelect('registration.classEntity', 'classEntity')
      .where('registration.studentId = :studentId', {
        studentId: payload.studentId,
      })
      .andWhere('classEntity.classDate = :classDate', {
        classDate: classEntity.classDate,
      })
      .andWhere('classEntity.classStartTime = :classStartTime', {
        classStartTime: classEntity.classStartTime,
      })
      .andWhere('classEntity.classEndTime = :classEndTime', {
        classEndTime: classEntity.classEndTime,
      })
      .getOne();

    if (existing) {
      throw new BadRequestException('Schedule conflict for student');
    }

    const scheduleDate = new Date(payload.scheduledAt);
    if (Number.isNaN(scheduleDate.getTime())) {
      throw new BadRequestException('Invalid scheduledAt');
    }

    const subscription = await this.subscriptionsService.findActiveForStudent(
      payload.studentId,
      scheduleDate,
    );

    if (!subscription) {
      throw new BadRequestException('No active subscription');
    }

    if (subscription.usedSessions >= subscription.totalSessions) {
      throw new BadRequestException('No remaining sessions');
    }

    await this.subscriptionsService.useSession(subscription.id);

    const registration = this.registrationsRepository.create({
      classEntity,
      student,
      scheduledAt: scheduleDate,
    });

    return this.registrationsRepository.save(registration);
  }

  async cancel(registrationId: string) {
    const registration = await this.registrationsRepository.findOne({
      where: { id: registrationId },
      relations: ['classEntity'],
    });

    if (!registration) {
      throw new NotFoundException('Registration not found');
    }

    const now = new Date();
    const scheduled = new Date(registration.scheduledAt);
    const hoursDiff = (scheduled.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      const subscription = await this.subscriptionsService.findActiveForStudent(
        registration.studentId,
        scheduled,
      );

      if (subscription) {
        await this.subscriptionsService.returnSession(subscription.id);
      }
    }

    await this.registrationsRepository.remove(registration);
    return { success: true };
  }
}
