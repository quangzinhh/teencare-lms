import { IsDateString } from 'class-validator';

export class UseSubscriptionDto {
  @IsDateString()
  usedAt: string;
}
