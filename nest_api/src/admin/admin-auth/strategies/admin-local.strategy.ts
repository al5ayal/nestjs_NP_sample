import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AdminAuthService } from '../admin-auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private readonly adminAuthService: AdminAuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.adminAuthService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('invalid Credentials 666');
    }
    return user;
  }
}
