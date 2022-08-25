import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AdminGuard } from './admin-auth/guards/admin.guard';

@Controller()
export class AdminController {
  @UseGuards(AdminGuard)
  @Get()
  @Render('index')
  index(@Req() req) {
    return { message: JSON.stringify(req.user), activePage: 'dashboard' };
  }
}
