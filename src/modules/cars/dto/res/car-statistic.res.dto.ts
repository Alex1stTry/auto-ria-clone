import { PickType } from '@nestjs/swagger';

import { BaseCarResDto } from './base-car.res.dto';

export class CarStatisticResDto extends PickType(BaseCarResDto, [
  'id',
  'brand',
  'model',
  'year',
  'price',
  'body',
  'photos',
  'city',
  'countOfViews',
]) {
  averagePriceUa: number;

  averagePriceCity: number;
}
