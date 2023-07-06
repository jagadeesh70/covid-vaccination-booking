/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtGuard)
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}
  @Get('vaccination-centres')
  async searchVaccinationCentres() {
    const vaccinationCentres =
      await this.bookingService.searchVaccinationCentres();
    return vaccinationCentres;
  }

  @Post('vaccination-slot/:centreId')
  async applyForVaccinationSlot(
    @Param('centreId') centreId: string,
    @Req() req: Request,
  ) {
    let access_token = req.headers.authorization;
    if (!access_token.startsWith('Bearer ')) {
      throw new BadRequestException();
    }
    const parsedId = parseInt(centreId);
    access_token = access_token.substring(7, access_token.length);
    const slot = await this.bookingService.applyForVaccinationSlot(
      parsedId,
      access_token,
    );
    return slot;
  }
}
