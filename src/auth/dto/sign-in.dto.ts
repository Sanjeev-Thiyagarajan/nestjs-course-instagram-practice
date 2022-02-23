import { IsEmail, IsString, Length } from 'class-validator';

export class SignInDto {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
