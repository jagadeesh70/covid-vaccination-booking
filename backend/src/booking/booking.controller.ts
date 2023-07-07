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
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingService } from './booking.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtGuard)
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}
  @Post()
  bookTicket(@Body() createBookingDto: CreateBookingDto, @Req() req: Request) {
    let access_token = req.headers.authorization;
    if (!access_token.startsWith('Bearer ')) {
      throw new BadRequestException();
    }
    access_token = access_token.substring(7, access_token.length);
    return this.bookingService.bookTicket(createBookingDto, access_token);
  }

  @Get('/mybookings')
  getUserBookings(@Req() req: Request) {
    let access_token = req.headers.authorization;
    if (!access_token.startsWith('Bearer ')) {
      throw new BadRequestException();
    }
    access_token = access_token.substring(7, access_token.length);
    return this.bookingService.getUserBookings(access_token);
  }

  @Get('/avilableFlight')
  getAvilableFlights(@Req() req: Request){
    let access_token = req.headers.authorization;
    if (!access_token.startsWith('Bearer ')) {
      throw new BadRequestException();
    }
    return this.bookingService.getFlights();
  }
}
