import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Parent } from '../parents/parent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Parent])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
