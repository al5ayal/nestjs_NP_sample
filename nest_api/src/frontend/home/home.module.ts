import { UsersModule } from './../../users/users.module';
import { AuthModule } from './../auth/auth.module';
import { HomeController } from './home.controller';
import { Module } from '@nestjs/common';
import { HomeService } from './home.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
