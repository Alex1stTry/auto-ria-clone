import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decoraors/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CarsQueryList } from '../cars/dto/req/cars-query-list.dto';
import { CarResDtoWithUser } from '../cars/dto/res/car-user.res.dto';
import { CarMapper } from '../cars/services/car.mapper';
import { CustomerRoleGuard } from './guard/customer-role.guard';
import { CustomersMapper } from './services/customers.mapper';
import { CustomersService } from './services/customers.service';

@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customers')
@UseGuards(CustomerRoleGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get('me')
  public async getMe(@CurrentUser() userData: IUserData): Promise<any> {
    const res = await this.customersService.getMe(userData);
    return CustomersMapper.toResponseDto(res);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get('get-cars')
  public async getCars(
    @Query() query: CarsQueryList,
    @CurrentUser() userData: IUserData,
  ): Promise<CarResDtoWithUser[]> {
    const res = await this.customersService.getCars(userData, query);
    return CarMapper.toCarsListResponseDto(res);
  }

  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  @Get('car/:carId')
  public async getCarById(
    @Param('carId', ParseUUIDPipe) carId: string,
  ): Promise<CarResDtoWithUser> {
    const res = await this.customersService.getCarById(carId);
    return CarMapper.toCarResDtoWithUser(res);
  }
}
