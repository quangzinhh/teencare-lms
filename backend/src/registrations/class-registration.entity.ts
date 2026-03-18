import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Student } from '../students/student.entity';
import { Class } from '../classes/class.entity';

@Entity('class_registrations')
export class ClassRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.registrations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'classId' })
  classEntity: Class;

  @RelationId((registration: ClassRegistration) => registration.classEntity)
  classId: string;

  @ManyToOne(() => Student, (student) => student.registrations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @RelationId((registration: ClassRegistration) => registration.student)
  studentId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  scheduledAt: Date;
}
