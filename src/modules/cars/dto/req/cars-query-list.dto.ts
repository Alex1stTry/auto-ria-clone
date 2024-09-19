import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helper/transform-helper';

export class CarsQueryList {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number = 0;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toUpperCase)
  @IsString()
  @IsOptional()
  search?: string;
}
