import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller('api/classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  async create(@Body() payload: CreateClassDto) {
    return this.classesService.create(payload);
  }

  @Get()
  async list(@Query('date') date?: string) {
    return this.classesService.findByDay(date);
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const classEntity = await this.classesService.findByIdWithRegistrations(id);
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    return classEntity;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() payload: UpdateClassDto,
  ) {
    return this.classesService.updateById(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.classesService.deleteById(id);
  }
}
