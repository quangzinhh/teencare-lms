import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('api/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async create(@Body() payload: CreateSubscriptionDto) {
    return this.subscriptionsService.create(payload);
  }

  @Get('student/:studentId')
  async listByStudent(@Param('studentId') studentId: string) {
    return this.subscriptionsService.listByStudent(studentId);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.subscriptionsService.getById(id);
  }

  @Patch(':id/use')
  async useSession(@Param('id') id: string) {
    return this.subscriptionsService.useSession(id);
  }
}
