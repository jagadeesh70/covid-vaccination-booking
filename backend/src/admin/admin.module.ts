import { PrismaService } from 'src/prisma.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService, PrismaService, JwtService, UsersService],
})
export class AdminModule {}
