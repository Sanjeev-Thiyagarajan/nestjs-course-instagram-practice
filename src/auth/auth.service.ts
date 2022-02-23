import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload } from './access-token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { username, password } = signUpDto;

    const foundUser = await this.usersRepository.findOne({ username });

    if (foundUser) {
      throw new ConflictException('Email is already in use');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = this.usersRepository.create({
      username,
      password: passwordHash,
    });
    await this.usersRepository.save(user);
    return user;
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { username, password } = signInDto;

    const user = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Username or Password is incorrect');
    }

    const passwordCompareResult = await bcrypt.compare(password, user.password);

    if (!passwordCompareResult) {
      throw new UnauthorizedException('Username or Password is incorrect');
    }
    const payload: AccessTokenPayload = { username };
    const accessToken: string = await this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
