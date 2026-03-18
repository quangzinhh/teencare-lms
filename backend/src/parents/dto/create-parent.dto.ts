import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateParentDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
