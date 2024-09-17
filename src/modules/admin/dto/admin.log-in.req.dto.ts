import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

import { TransformHelper } from '../../../common/helper/transform-helper';

export class AdminLogInReqDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @ApiProperty({ example: 'admin' })
  public readonly password: string;
}
