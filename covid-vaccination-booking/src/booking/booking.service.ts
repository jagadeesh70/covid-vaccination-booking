/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtService } from '@nestjs/jwt';
import { Vaccination, VaccinationCentre } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async searchVaccinationCentres(): Promise<VaccinationCentre[]> {
    // Retrieve and return all vaccination centres from the database using Prisma
    const vaccinationCentres = await this.prisma.vaccinationCentre.findMany();
    return vaccinationCentres;
  }

  async applyForVaccinationSlot(centreId: number, token): Promise<Vaccination> {
    const id = this.jwtService.decode(token)['id'];
    const vaccinationCentre = await this.prisma.vaccinationCentre.findUnique({
      where: { id: centreId },
    });
    if (!vaccinationCentre) {
      throw new NotFoundException('Vaccination centre not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookedSlots = await this.prisma.vaccination.count({
      where: {
        vaccinationCentreId: centreId,
        createdAt: { gte: today.toISOString() },
      },
    });
    if (bookedSlots >= 10) {
      throw new ConflictException(
        'No available slots at the vaccination centre',
      );
    }

    const userDosage = await this.prisma.vaccination.aggregate({
      where: { userId: 1 },
      _sum: { dosage: true },
    });
    const totalDosage = userDosage._sum?.dosage || 0;
    if (totalDosage >= 10) {
      throw new ConflictException('Maximum dosage reached');
    }
    const newVaccination = await this.prisma.vaccination.create({
      data: {
        userId: id,
        vaccinationCentreId: centreId,
        dosage: 1,
      },
    });

    return newVaccination;
  }
}
