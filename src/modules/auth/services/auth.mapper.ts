import { CustomersEntity } from '../../../database/entities/customers.entity';
import { SellersEntity } from '../../../database/entities/sellers.entity';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokensResDto } from '../dto/res/tokens.res.dto';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { IUserData } from '../interfaces/user-data.interface';

export class AuthMapper {
  public static toResponseDto(
    data: CustomersEntity | SellersEntity,
    tokens: TokensResDto,
  ): AuthResDto {
    return {
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        createdAt: data.created,
      },
      tokens,
    };
  }

  public static toUserData(
    user: SellersEntity | CustomersEntity,
    payload: IJwtPayload,
  ): IUserData {
    return {
      userId: payload.userId,
      email: user.email,
      role: payload.role,
      accountType: user.account,
    };
  }
}
