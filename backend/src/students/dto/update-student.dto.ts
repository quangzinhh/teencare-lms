import { IsOptional, IsString, Length } from 'class-validator';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto implements Partial<CreateStudentDto> {
    @IsOptional()
    @IsString()
    @Length(2, 150)
    name: string;
}