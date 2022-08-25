import { UsersService } from './../../users/users.service';
import {
  Body,
  Controller,
  // Logger,
  Post,
  UseGuards,
  Request,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserPostRequest } from 'src/dtos';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class HomeController {
  // private readonly logger = new Logger('HomeController');
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('')
  async home(@Request() request) {
    return 'home page';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      return await this.authService.login(req.user);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() request) {
    return request.user;
  }

  @Post('register')
  async register(@Body() userPostRequest: UserPostRequest) {
    try {
      return await this.usersService.createUser(userPostRequest);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('logout')
  async logout() {
    return {
      message: 'Hello Logout!',
    };
  }
}
