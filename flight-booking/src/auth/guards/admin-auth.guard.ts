import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const access_token: string = request.headers.authorization;
    if (!access_token) return false;
    try {
      const user = await this.jwtService.verify(
        access_token.replace('Bearer ', ''),
        {
          secret: 'SECRET',
        },
      );
      const userDetails = await this.userService.findUserById(user.id);
      if (userDetails) {
        return true;
      }
      if (!user) {
        return false;
      }

      const isAdmin = user.isAdmin;
      if (!isAdmin) {
        throw new ForbiddenException('You dont have access for this action');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('You dont have access for this action');
    }
  }
}
