import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClassRegistration } from '../registrations/class-registration.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 100 })
  subject: string;

  @Column({ type: 'date', nullable: true })
  classDate: string | null;

  @Column({ type: 'time', nullable: true })
  classStartTime: string | null;

  @Column({ type: 'time', nullable: true })
  classEndTime: string | null;

  @Column({ length: 120 })
  teacherName: string;

  @Column({ type: 'int' })
  maxStudents: number;

  @OneToMany(() => ClassRegistration, (registration) => registration.classEntity)
  registrations: ClassRegistration[];
}
