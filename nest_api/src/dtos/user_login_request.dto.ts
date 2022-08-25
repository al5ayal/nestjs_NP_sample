import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class UserLoginRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
