import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateRegistrationDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsDateString()
  scheduledAt: string;
}
