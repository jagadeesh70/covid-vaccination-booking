import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RefreshJwtGuard } from './guards/refreshtoken.guard';
import { ApiResponse } from 'src/common/api-response';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const response = await this.authService.login(req.user);
    return {
      accessToken: response.accessToken,
      refrshToken: response.refreshToken,
    };
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    delete createUserDto.passwordConfirm;
    await this.userService.registerUser(createUserDto);
    return new ApiResponse<string>('Created Successfully', 'success', 200);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
