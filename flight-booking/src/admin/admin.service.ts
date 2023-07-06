/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { Flight } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}
  async addFlight(createFlightDto: CreateFlightDto): Promise<Flight> {
    createFlightDto.date = new Date(createFlightDto.date);
    return this.prismaService.flight.create({
      data: createFlightDto,
    });
  }

  async getFlightBookings(id: string): Promise<Flight> {
    return this.prismaService.flight.findUnique({
      where: { id: parseInt(id) },
      include: { booking: true },
    });
  }

  async removeFlight(id: string): Promise<void> {
    const parsedId = parseInt(id);
    const flight = await this.prismaService.flight.findUnique({
      where: { id: parsedId },
    });
    if (!flight) {
      throw new NotFoundException('Flight not found.');
    }

    await this.prismaService.flight.delete({
      where: { id: parsedId },
    });
  }
}
