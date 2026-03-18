import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { Parent } from '../parents/parent.entity';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(Parent)
    private readonly parentsRepository: Repository<Parent>,
  ) { }

  async create(payload: CreateStudentDto): Promise<Student> {
    const parent = await this.parentsRepository.findOne({
      where: { id: payload.parentId },
    });

    if (!parent) {
      throw new BadRequestException('Parent not found');
    }

    const student = this.studentsRepository.create({
      name: payload.name,
      dob: payload.dob,
      gender: payload.gender,
      currentGrade: payload.currentGrade,
      parentId: payload.parentId,
    });

    return this.studentsRepository.save(student);
  }

  async findById(id: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { id },
      relations: ['parent'],
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async findAll(): Promise<Student[]> {
    return this.studentsRepository.find({ relations: ['parent'] });
  }

  async updateById(id: string, payload: UpdateStudentDto): Promise<Student> {
    const student = await this.findById(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return this.studentsRepository.save({ ...student, ...payload });
  }

  async deleteById(id: string): Promise<void> {
    const student = await this.findById(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    await this.studentsRepository.delete(id);
  }
}
