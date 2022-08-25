import { AdminAuthService } from './admin-auth.service';
import {
  Controller,
  Post,
  UseGuards,
  Res,
  Get,
  Req,
  Render,
  UseFilters,
} from '@nestjs/common';
import { AdminLocalAuthGuard } from './guards/admin-local-auth.guard';
import { AuthExceptionFilter } from '../filters/auth-exceptions.filter';

@Controller('admin')
export class AdminAuthController {
  constructor(private readonly adminAuth: AdminAuthService) {}

  @Get('login')
  @Render('login')
  loginView(@Req() req, @Res() res) {
    if (req.user) res.redirect('/admin');
    return { errorMessage: req.flash('loginError') };
  }

  @UseGuards(AdminLocalAuthGuard)
  @Post('login')
  @UseFilters(new AuthExceptionFilter())
  login(@Res() res) {
    return res.redirect('/admin');
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    await req.logout(function () {
      return res.redirect('login');
    });
  }
}
