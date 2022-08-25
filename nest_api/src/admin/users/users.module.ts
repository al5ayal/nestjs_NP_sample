import { UsersService } from 'src/users/users.service';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  imports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
