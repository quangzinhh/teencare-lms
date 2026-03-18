import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  subject: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  classDate: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  classStartTime: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  classEndTime: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  teacherName: string;

  @IsInt()
  @Min(1)
  maxStudents: number;
}
