import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { CustomersEntity } from '../../../database/entities/customers.entity';
import { SellersEntity } from '../../../database/entities/sellers.entity';
import { CustomersRepository } from '../../repository/services/customers.repository';
import { RefreshTokensRepository } from '../../repository/services/refresh-tokens.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { UserRoleEnum } from '../../users/enum/user-role.enum';
import { TokenType } from '../enums/token-type.enum';
import { AuthMapper } from '../services/auth.mapper';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshRepo: RefreshTokensRepository,
    private readonly sellersRepo: SellersRepository,
    private readonly customersRepo: CustomersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refresh = request.get('Authorization')?.split('Bearer ')[1];

    if (!refresh) {
      throw new UnauthorizedException();
    }

    const payload = await this.tokenService.verifyToken(
      refresh,
      TokenType.REFRESH,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const isRefreshExist = await this.refreshRepo.isRefreshExist(refresh);
    if (!isRefreshExist) {
      throw new UnauthorizedException();
    }

    let user: SellersEntity | CustomersEntity;
    switch (payload.role) {
      case UserRoleEnum.SALESMAN:
        user = await this.sellersRepo.findOneBy({ id: payload.userId });
        break;
      case UserRoleEnum.CUSTOMER:
        user = await this.customersRepo.findOneBy({ id: payload.userId });
        break;
    }
    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = AuthMapper.toUserData(user, payload);
    return true;
  }
}
