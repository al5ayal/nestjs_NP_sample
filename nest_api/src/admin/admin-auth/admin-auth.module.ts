import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { SessionSerializer } from './session.serializer';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AdminLocalStrategy, SessionSerializer],
})
export class AdminAuthModule {}
