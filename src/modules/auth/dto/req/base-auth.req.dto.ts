import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { UserRoleEnum } from '../../../../common/enum/user-role.enum';
import { TransformHelper } from '../../../../common/helper/transform-helper';
import { regexConstants } from '../../constants/regex-constants';
import { AccountTypeEnum } from '../../enums/account-type.enum';

export class BaseAuthReqDto {
  @ApiProperty({ example: 'Alex' })
  @IsNotEmpty()
  @IsString()
  @Transform(TransformHelper.trim)
  @Length(2, 20, { message: 'min 2 max 20 characters' })
  public readonly name: string;

  @ApiProperty({ example: 'example.user@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Matches(regexConstants.EMAIL, { message: 'Incorrect email' })
  @Transform(TransformHelper.trim)
  public readonly email: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @Matches(regexConstants.PASSWORD, {
    message:
      'at least one letter (either uppercase or lowercase),' +
      'at least one digit, at least one special character from the set @$!%_*#?&,' +
      'at least 8 characters long',
  })
  public readonly password: string;

  @ApiProperty({ example: '+380630508150' })
  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @Matches(regexConstants.PHONE, { message: 'incorrect phone number' })
  public readonly phone: string;

  @ApiProperty({ example: 'customer or salesman' })
  @Transform(TransformHelper.trim)
  @IsIn([UserRoleEnum.SALESMAN, UserRoleEnum.CUSTOMER])
  role: UserRoleEnum;

  @IsOptional()
  @ApiProperty({ default: AccountTypeEnum.BASE })
  public readonly account?: string;
}
