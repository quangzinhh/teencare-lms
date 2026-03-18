import { IsDateString, IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  packageName: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  @Min(1)
  totalSessions: number;

  @IsInt()
  @Min(0)
  usedSessions?: number;
}
