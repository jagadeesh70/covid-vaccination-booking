import { PrismaService } from 'src/prisma.service';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [BookingService, PrismaService, JwtService],
})
export class BookingModule {}
