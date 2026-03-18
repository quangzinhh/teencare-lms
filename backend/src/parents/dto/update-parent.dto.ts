import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { CreateParentDto } from './create-parent.dto';

export class UpdateParentDto implements Partial<CreateParentDto> {
    @IsOptional()
    @IsString()
    @Length(2, 150)
    name: string;

    @IsOptional()
    @IsString()
    @Length(6, 30)
    phone: string;

    @IsOptional()
    @IsEmail()
    email: string;
}