import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Parent } from '../parents/parent.entity';
import { ClassRegistration } from '../registrations/class-registration.entity';
import { Subscription } from '../subscriptions/subscription.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'date' })
  dob: string;

  @Column({ length: 20 })
  gender: string;

  @Column({ length: 20 })
  currentGrade: string;

  @ManyToOne(() => Parent, (parent) => parent.students, { onDelete: 'CASCADE' })
  parent: Parent;

  @Column()
  parentId: string;

  @OneToMany(() => ClassRegistration, (registration) => registration.student)
  registrations: ClassRegistration[];

  @OneToMany(() => Subscription, (subscription) => subscription.student)
  subscriptions: Subscription[];
}
