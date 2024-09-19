import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNumber, IsString, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helper/transform-helper';

export class CarReqDto {
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toUpperCase)
  @IsString()
  @ApiProperty({ example: 'opel' })
  public readonly brand: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toUpperCase)
  @IsString()
  @Type(() => String)
  @ApiProperty({ example: 'zafira' })
  public readonly model: string;

  @IsNumber()
  @ApiProperty({ example: 20000 })
  public readonly price: number;

  @IsInt()
  @ApiProperty({ example: 1994 })
  @Min(1994)
  @Max(new Date().getFullYear())
  public readonly year: number;

  @Transform(TransformHelper.trim)
  @IsString()
  @ApiProperty({ example: 'describe all information about this car' })
  public readonly body: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toUpperCase)
  @IsString()
  @ApiProperty({ example: 'Lviv' })
  public readonly city: string;
}
