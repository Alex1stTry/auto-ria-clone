import { PickType } from '@nestjs/swagger';

import { BaseCarResDto } from './base-car.res.dto';

export class CarResDtoWithUser extends PickType(BaseCarResDto, [
  'id',
  'brand',
  'model',
  'year',
  'price',
  'body',
  'photos',
  'city',
  'salesman',
]) {}
