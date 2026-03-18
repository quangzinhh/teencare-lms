import { Body, Controller, Get, NotFoundException, Param, Post, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';

@Controller('api/parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Post()
  async create(@Body() payload: CreateParentDto) {
    return this.parentsService.create(payload);
  }

  @Get()
  async list() {
    return this.parentsService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const parent = await this.parentsService.findById(id);
    if (!parent) {
      throw new NotFoundException('Parent not found');
    }
    return parent;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() payload: UpdateParentDto,
  ) {
    return this.parentsService.updateById(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.parentsService.deleteById(id);
  }
}
