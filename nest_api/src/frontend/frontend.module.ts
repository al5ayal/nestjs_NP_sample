import { Module } from '@nestjs/common';
import { HomeService } from './home/home.service';
import { HomeModule } from './home/home.module';

@Module({
  imports: [HomeModule],
  controllers: [],
  providers: [HomeService],
})
export class FrontendModule {}
