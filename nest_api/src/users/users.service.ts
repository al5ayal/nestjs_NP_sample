import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email, is_active: true },
    });
  }

  async findAdminByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email, is_active: true, is_admin: true },
    });
  }

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<any> {
    const user = new User();
    user.name = userData.name;
    user.email = userData.email;

    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    //hash password
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    user.password = hashedPassword;
    const { password, id, ...newUser } = await this.userRepository.save(user);
    return newUser;
  }

  async getAllNonAdmin() {
    return await this.userRepository.find({
      where: { is_admin: false },
      order: { id: 'DESC' },
    });
  }
}
