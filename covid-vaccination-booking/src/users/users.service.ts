import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const createUser = await this.prisma.user.create({ data: createUserDto });
    return createUser;
  }
  async registerUser(user: CreateUserDto) {
    const findUser = await this.readEmail(user.email);
    if (findUser) {
      throw new BadRequestException('User Exist Already');
    }
    const encryptedPassword = await this.setPassword(user.password);
    const createUser = await this.prisma.user.create({
      data: { ...user, password: encryptedPassword },
    });
    return createUser;
  }

  async readEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id: id } });
    if (!user) {
      return null;
    }
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      return null;
    }
    return user;
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async setPassword(password: string) {
    if (password) {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(password, salt);
    }
    throw new BadRequestException('Invalid request');
  }
}
