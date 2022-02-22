import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { username, password } = signUpDto;

    const foundUser = await this.usersRepository.findOne({ username });

    if (foundUser) {
      throw new ConflictException('Email is already in use');
    }

    const user = this.usersRepository.create({ username, password });
    await this.usersRepository.save(user);
    return user;
  }
}
