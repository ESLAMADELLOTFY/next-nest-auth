import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_CONSTANTS } from './auth.constants.js';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import type { Request, Response } from 'express';
import { SignInDto } from './dto/signin.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(registerDto);
    this.setAccessTokenCookie(res, result.accessToken);

    return {
      message: 'Register successful',
      user: result.user,
    };
  }

  @Post('login')
  async login(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signIn(signInDto);
    this.setAccessTokenCookie(res, result.accessToken);

    return {
      message: 'Login successful',
      user: result.user,
    };
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(AUTH_CONSTANTS.ACCESS_TOKEN_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
  
    return {
      message: 'Logged out successfully',
    };
  }
  @Get('me')
  me(@Req() req: Request) {
    const token = this.extractAccessToken(req);

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    return this.authService.getMe(token);
  }

  private setAccessTokenCookie(res: Response, accessToken: string) {
    res.cookie(AUTH_CONSTANTS.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: AUTH_CONSTANTS.ACCESS_TOKEN_COOKIE_MAX_AGE,
    });
  }

  private extractAccessToken(req: Request) {
    const authorization = req.headers.authorization;

    if (authorization?.startsWith('Bearer ')) {
      return authorization.slice('Bearer '.length);
    }

    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return null;

    const accessTokenCookie = cookieHeader
      .split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${AUTH_CONSTANTS.ACCESS_TOKEN_COOKIE_NAME}=`));

    if (!accessTokenCookie) return null;

    return decodeURIComponent(accessTokenCookie.split('=').slice(1).join('='));
  }
}
