import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../students/student.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.subscriptions, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @Column()
  studentId: string;

  @Column({ length: 120 })
  packageName: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ type: 'int' })
  totalSessions: number;

  @Column({ type: 'int', default: 0 })
  usedSessions: number;
}
