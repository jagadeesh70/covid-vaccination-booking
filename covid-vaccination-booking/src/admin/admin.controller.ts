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
import { ApiResponse } from 'src/common/api-response';

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Post('vaccination-centres')
  async addVaccinationCentre(@Body() centreData: any) {
    const newCentre = await this.adminService.addVaccinationCentre(centreData);
    return newCentre;
  }

  @Get('dosage-details')
  async getDosageDetails() {
    const dosageDetails = await this.adminService.getDosageDetails();
    return new ApiResponse(dosageDetails, 'success', 200);
  }

  @Delete('vaccination-centres/:centreId')
  async removeVaccinationCentre(@Param('centreId') centreId: number) {
    await this.adminService.removeVaccinationCentre(centreId);
    return { message: 'Vaccination centre removed successfully' };
  }
}
