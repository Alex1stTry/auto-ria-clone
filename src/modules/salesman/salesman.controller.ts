import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { CurrentUser } from '../auth/decoraors/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CarReqDto } from '../cars/dto/req/car.req.dto';
import { CarResDto } from '../cars/dto/res/car-res.dto';
import { CarStatisticResDto } from '../cars/dto/res/car-statistic.res.dto';
import { CarMapper } from '../cars/services/car.mapper';
import { SalesmanPremiumResDto } from './dto/res/salesman-premium.res.dto';
import { SalesmanPrivateResDto } from './dto/res/salesman-private-res.dto';
import { BasicAccountGuard } from './guards/basic-account.guard';
import { PremiumAccountGuard } from './guards/premium-account.guard';
import { SalesmanRoleGuard } from './guards/salesman-role.guard';
import { SalesmanMapper } from './services/salesman.mapper';
import { SalesmanService } from './services/salesman.service';

@UseGuards(SalesmanRoleGuard)
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
  ): Promise<SalesmanPrivateResDto> {
    const res = await this.salesmanService.getMe(userData);
    return SalesmanMapper.toSalesManResDto(res);
  }

  @Patch('buy-premium')
  public async buyPremium(
    @CurrentUser() userData: IUserData,
  ): Promise<SalesmanPremiumResDto> {
    const res = await this.salesmanService.buyPremium(userData);
    return SalesmanMapper.toResponseDto(res);
  }

  @ApiForbiddenResponse()
  @UseGuards(BasicAccountGuard)
  @Post('add-car')
  public async addCar(
    @CurrentUser() userData: IUserData,
    @Body() dto: CarReqDto,
  ): Promise<CarResDto> {
    const res = await this.salesmanService.addCar(userData, dto);
    return CarMapper.toCarResDto(res);
  }

  @Patch('add-photos/:carId')
  @UseInterceptors(FilesInterceptor('photos'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiFile('photos', true, false)
  public async addPhotos(
    @UploadedFiles() photos: Express.Multer.File[],
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: string,
  ): Promise<void> {
    await this.salesmanService.addPhotos(userData, photos, carId);
  }

  @ApiForbiddenResponse()
  @UseGuards(PremiumAccountGuard)
  @Get('get-statistics')
  public async getStatistics(
    @CurrentUser() userData: IUserData,
  ): Promise<CarStatisticResDto[]> {
    const res = await this.salesmanService.getStatistics(userData);
    return CarMapper.toCarStatistic(res);
  }
}
