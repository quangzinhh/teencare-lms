import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() payload: CreateStudentDto) {
    return this.studentsService.create(payload);
  }

  @Get()
  async list() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.studentsService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateStudentDto) {
    return this.studentsService.updateById(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.studentsService.deleteById(id);
  }
}
