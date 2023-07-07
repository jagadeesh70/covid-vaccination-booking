/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Booking } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async searchFlights(date: string) {
    const flights = await this.prisma.flight.findMany();
    return flights.filter((flight) => flight.date === new Date(date));
  }

  async getFlights() {
    // const id = this.jwtService.decode(token)['id'];
    const flights = await this.prisma.flight.findMany();
    return flights;
  }

  async bookTicket(
    createBookingDto: CreateBookingDto,
    token,
  ): Promise<Booking> {
    const id = this.jwtService.decode(token)['id'];
    const { flightId } = createBookingDto;

    const flight = await this.prisma.flight.findUnique({
      where: { id: flightId },
    });
    if (!flight) {
      throw new NotFoundException('Flight not found.');
    }

    if (flight.availableSeats === 0) {
      throw new BadRequestException('No seats available for booking.');
    }

    const booking = await this.prisma.booking.create({
      data: {
        userId: id,
        seatNo: createBookingDto.seatNo,
        flightId: flightId,
      },
    });

    await this.prisma.flight.update({
      where: { id: flightId },
      data: { availableSeats: flight.availableSeats - 1 },
    });

    return booking;
  }

  async getUserBookings(token): Promise<Booking[]> {
    const userId = this.jwtService.decode(token)['id'];
    return this.prisma.booking.findMany({
      where: { userId },
    });
  }
}
