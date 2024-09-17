import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decoraors/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CarReqDto } from '../cars/dto/req/car.req.dto';
import { CarsResDto } from '../cars/dto/res/cars.res.dto';
import { SalesmanResDto } from './dto/res/salesman.res.dto';
import { SalesmanMapper } from './services/salesman.mapper';
import { SalesmanService } from './services/salesman.service';

@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiTags('Salesman')
@Controller('salesman')
export class SalesmanController {
  constructor(private readonly salesmanService: SalesmanService) {}

  @ApiNotFoundResponse({ description: 'Not found' })
  @Get('me')
  public async getMe(
    @CurrentUser() userData: IUserData,
  ): Promise<SalesmanResDto> {
    const res = await this.salesmanService.getMe(userData);
    return SalesmanMapper.toResponseDto(res);
  }

  @Patch('buy-premium')
  @ApiUnauthorizedResponse()
  public async buyPremium(
    @CurrentUser() userData: IUserData,
  ): Promise<SalesmanResDto> {
    const res = await this.salesmanService.buyPremium(userData);
    return SalesmanMapper.toResponseDto(res);
  }

  @Post('add-car')
  public async addCar(
    @CurrentUser() userData: IUserData,
    @Body() dto: CarReqDto,
  ): Promise<CarsResDto> {
    return await this.salesmanService.addCar(userData, dto);
  }
}
