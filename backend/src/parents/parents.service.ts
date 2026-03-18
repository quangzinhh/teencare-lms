import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from './parent.entity';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private readonly parentsRepository: Repository<Parent>,
  ) { }

  async create(payload: CreateParentDto): Promise<Parent> {
    const parent = this.parentsRepository.create(payload);
    return this.parentsRepository.save(parent);
  }

  async findById(id: string): Promise<Parent | null> {
    return this.parentsRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Parent[]> {
    return this.parentsRepository.find();
  }

  async updateById(id: string, payload: UpdateParentDto): Promise<Parent> {
    const parent = await this.findById(id);
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }
    return this.parentsRepository.save({ ...parent, ...payload });
  }

  async deleteById(id: string): Promise<void> {
    const parent = await this.findById(id);
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }
    await this.parentsRepository.delete(id);
  }
}
