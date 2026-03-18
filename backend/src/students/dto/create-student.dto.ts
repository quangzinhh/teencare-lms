import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  name: string;

  @IsDateString()
  dob: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  gender: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  currentGrade: string;

  @IsString()
  @IsNotEmpty()
  parentId: string;
}
