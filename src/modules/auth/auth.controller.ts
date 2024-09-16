import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from './decoraors/current-user.decorator';
import { SkipAuth } from './decoraors/skip-auth.decorator';
import { LoginReqDto } from './dto/req/login.req.dto';
import { RegisterReqDto } from './dto/req/register.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { TokensResDto } from './dto/res/tokens.res.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh-guard';
import { IUserData } from './interfaces/user-data.interface';
import { AuthMapper } from './services/auth.mapper';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  @SkipAuth()
  public async register(@Body() dto: RegisterReqDto): Promise<AuthResDto> {
    const res = await this.authService.register(dto);
    return AuthMapper.toResponseDto(res.user, res.tokens);
  }

  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @SkipAuth()
  @Post('log-in')
  public async logIn(@Body() dto: LoginReqDto): Promise<AuthResDto> {
    const res = await this.authService.logIn(dto);
    return AuthMapper.toResponseDto(res.user, res.tokens);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @Post('log-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logOut(@CurrentUser() userData: IUserData): Promise<void> {
    await this.authService.logOut(userData);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @Post('refresh')
  @SkipAuth()
  @UseGuards(JwtRefreshGuard)
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokensResDto> {
    return await this.authService.refresh(userData);
  }
}
