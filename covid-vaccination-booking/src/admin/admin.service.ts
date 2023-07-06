/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { VaccinationCentre } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async addVaccinationCentre(centreData: any): Promise<VaccinationCentre> {
    const newCentre = await this.prismaService.vaccinationCentre.create({
      data: {
        name: centreData.name,
        address: centreData.address,
        workingHours: centreData.workingHours,
      },
    });

    return newCentre;
  }

  async getDosageDetails() {
    const dosageDetails = await this.prismaService.vaccination.groupBy({
      by: ['vaccinationCentreId'],
      _sum: { dosage: true },
    });

    return dosageDetails.map((detail) => ({
      centreId: detail.vaccinationCentreId,
      totalDosage: detail._sum?.dosage || 0,
    }));
  }

  async removeVaccinationCentre(centreId: number) {
    await this.prismaService.vaccinationCentre.delete({
      where: { id: centreId },
    });
  }
}
