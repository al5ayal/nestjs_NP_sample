import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from './../../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isPasswordMatching = await bcrypt.compare(
      password,
      user?.password ?? '',
    );
    if (user && isPasswordMatching) {
      delete user.password;

      return user;
    }
    // return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    console.log('login user 0', user);
    const token_payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(token_payload) };
  }
}
