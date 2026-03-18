import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Student } from '../students/student.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  async create(payload: CreateSubscriptionDto): Promise<Subscription> {
    const student = await this.studentsRepository.findOne({
      where: { id: payload.studentId },
    });

    if (!student) {
      throw new BadRequestException('Student not found');
    }

    const subscription = this.subscriptionsRepository.create({
      studentId: payload.studentId,
      packageName: payload.packageName,
      startDate: payload.startDate,
      endDate: payload.endDate,
      totalSessions: payload.totalSessions,
      usedSessions: payload.usedSessions ?? 0,
    });

    return this.subscriptionsRepository.save(subscription);
  }

  async listByStudent(studentId: string): Promise<Subscription[]> {
    return this.subscriptionsRepository.find({
      where: { studentId },
      order: { endDate: 'DESC' },
    });
  }

  async getById(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async useSession(id: string): Promise<Subscription> {
    const subscription = await this.getById(id);

    if (subscription.usedSessions >= subscription.totalSessions) {
      throw new BadRequestException('No remaining sessions');
    }

    subscription.usedSessions += 1;
    return this.subscriptionsRepository.save(subscription);
  }

  async findActiveForStudent(studentId: string, date: Date): Promise<Subscription | null> {
    return this.subscriptionsRepository
      .createQueryBuilder('subscription')
      .where('subscription.studentId = :studentId', { studentId })
      .andWhere('subscription.startDate <= :date', { date: date.toISOString() })
      .andWhere('subscription.endDate >= :date', { date: date.toISOString() })
      .orderBy('subscription.endDate', 'DESC')
      .getOne();
  }

  async returnSession(subscriptionId: string): Promise<void> {
    const subscription = await this.getById(subscriptionId);
    subscription.usedSessions = Math.max(0, subscription.usedSessions - 1);
    await this.subscriptionsRepository.save(subscription);
  }
}
