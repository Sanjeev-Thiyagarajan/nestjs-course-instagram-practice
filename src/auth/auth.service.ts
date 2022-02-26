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
import * as jwt from 'jsonwebtoken';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { stringify } from 'querystring';
import { RefreshTokenPayload } from './refresh-token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
    @InjectRepository(RefreshTokensRepository)
    private refreshTokensRepository: RefreshTokensRepository,
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

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string; expiresDate: Date }> {
    const { username, password } = signInDto;

    const user = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Username or Password is incorrect');
    }

    const passwordCompareResult = await bcrypt.compare(password, user.password);

    if (!passwordCompareResult) {
      throw new UnauthorizedException('Username or Password is incorrect');
    }
    const access_payload: AccessTokenPayload = { username };
    const refresh_payload: AccessTokenPayload = { username };
    // const accessToken: string = this.jwtService.sign(access_payload);
    // const refreshToken: string = this.jwtService.sign(refresh_payload, {
    //   expiresIn: 604800,
    // });

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(access_payload),
      this.jwtService.sign(refresh_payload, {
        expiresIn: 604800,
        // expiresIn: 10,
      }),
    ]);

    const expiresDate = new Date(Date.now() + 604800000);

    const refreshTokenPersist = this.refreshTokensRepository.create({
      refreshToken,
      user,
      expiresAt: expiresDate,
    });

    await this.refreshTokensRepository.save(refreshTokenPersist);
    return {
      accessToken,
      refreshToken,
      expiresDate,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    let payload;
    try {
      payload = jwt.verify(refreshToken, 'mypassword');
    } catch (err) {
      throw new UnauthorizedException();
    }

    const foundToken = await this.refreshTokensRepository.findOne({
      where: {
        refreshToken,
      },
    });

    if (!foundToken) {
      throw new UnauthorizedException();
    }

    const access_payload: AccessTokenPayload = { username: payload.username };
    const accessToken = await this.jwtService.sign(access_payload);
    return { accessToken };
  }

  async logout(refreshToken: string) {
    await this.refreshTokensRepository.delete(refreshToken);
    return;
  }
}
