import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminAuthService {
  constructor(private readonly usersService: UsersService) {}

  // LocalSession
  async validateUser(email: string, password: string): Promise<any> {
    const adminUser = await this.usersService.findAdminByEmail(email);
    const isPasswordMatching = await bcrypt.compare(
      password,
      adminUser?.password ?? '',
    );
    if (adminUser && adminUser.is_admin && isPasswordMatching) {
      delete adminUser.password;

      return adminUser;
    }
    return null;
  }
}
