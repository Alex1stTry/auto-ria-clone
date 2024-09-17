import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helper/transform-helper';

export class CarReqDto {
  @Transform(TransformHelper.trim)
  @IsString()
  public readonly brand: string;

  @Transform(TransformHelper.trim)
  @IsString()
  public readonly model: string;

  @IsNumber()
  public readonly price: number;

  @IsInt()
  public readonly year: number;

  @Transform(TransformHelper.trim)
  @IsString()
  public readonly body: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toUpperCase)
  @IsString()
  public readonly city: string;
}
