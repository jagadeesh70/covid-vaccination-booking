/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { AdminService } from './admin.service';
import { AdminGuard } from 'src/auth/guards/admin-auth.guard';

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private admin: AdminService) {}
  @Post('addFlight')
  async addFlight(@Body() createFlightDto: CreateFlightDto) {
    return await this.admin.addFlight(createFlightDto);
  }
  @Get(':id/bookings')
  async getFlightBookings(@Param('id') id: string) {
    return await this.admin.getFlightBookings(id);
  }
  @Delete(':id')
  async removeFlight(@Param('id') id: string) {
    await this.admin.removeFlight(id);
    return 'Deleted Successfully';
  }
}
