import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classesRepository: Repository<Class>,
  ) { }

  async create(payload: CreateClassDto): Promise<Class> {
    const classEntity = this.classesRepository.create(payload);
    return this.classesRepository.save(classEntity);
  }

  async findByDay(classDate?: string): Promise<Class[]> {
    if (!classDate) {
      return this.classesRepository.find();
    }

    return this.classesRepository.find({
      where: { classDate },
    });
  }

  async findById(id: string): Promise<Class | null> {
    return this.classesRepository.findOne({
      where: { id },
    });
  }

  async findByIdWithRegistrations(id: string): Promise<Class | null> {
    return this.classesRepository.findOne({
      where: { id },
      relations: ['registrations', 'registrations.student'],
    });
  }

  async updateById(id: string, payload: UpdateClassDto): Promise<Class> {
    const classEntity = await this.findById(id);
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    return this.classesRepository.save({ ...classEntity, ...payload });
  }

  async deleteById(id: string): Promise<void> {
    const classEntity = await this.findById(id);
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    await this.classesRepository.delete(id);
  }
}
