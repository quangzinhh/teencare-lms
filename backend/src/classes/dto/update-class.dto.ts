import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateClassDto {
  @IsOptional()
  @IsString()
  @Length(2, 150)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  subject?: string;

  @IsOptional()
  @IsString()
  @Length(10, 10)
  classDate?: string;

  @IsOptional()
  @IsString()
  @Length(5, 5)
  classStartTime?: string;

  @IsOptional()
  @IsString()
  @Length(5, 5)
  classEndTime?: string;

  @IsOptional()
  @IsString()
  @Length(2, 120)
  teacherName?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxStudents?: number;
}
