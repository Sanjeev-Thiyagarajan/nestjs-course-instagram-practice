import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response, response } from 'express';
import { Cookies } from 'src/decorators/create-param.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken, expiresDate } = await this.authService.signIn(
      signInDto,
    );
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: expiresDate,
    });
    return this.authService.signIn(signInDto);
  }

  @Get('/testauth')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
    return 'hello';
  }

  @Post('/token')
  token(@Cookies('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    return this.authService.refreshToken(refreshToken);
  }

  @Get('/logout')
  logout(
    @Cookies('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('refreshToken');
    return this.authService.logout(refreshToken);
  }
}
