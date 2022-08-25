import { Controller, Get, Render } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Render('users/list')
  async userslist() {
    // return normal users list
    return {
      users: await this.userService.getAllNonAdmin(),
      activePage: 'users',
    };
  }
}
