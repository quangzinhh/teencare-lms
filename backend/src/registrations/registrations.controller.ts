import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Controller('api')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post('classes/:classId/register')
  async register(
    @Param('classId') classId: string,
    @Body() payload: CreateRegistrationDto,
  ) {
    return this.registrationsService.register(classId, payload);
  }

  @Delete('registrations/:id')
  async cancel(@Param('id') id: string) {
    return this.registrationsService.cancel(id);
  }
}
