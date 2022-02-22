import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  username: string;

  @IsString()
  @Length(3, 50, { message: 'password is too weak' })
  password: string;
}
