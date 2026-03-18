import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../students/student.entity';

@Entity('parents')
export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 30 })
  phone: string;

  @Column({ length: 150 })
  email: string;

  @OneToMany(() => Student, (student) => student.parent)
  students: Student[];
}
