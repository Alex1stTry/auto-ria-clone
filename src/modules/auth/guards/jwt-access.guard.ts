import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRoleEnum } from '../../../common/enum/user-role.enum';
import { CustomersEntity } from '../../../database/entities/customers.entity';
import { SellersEntity } from '../../../database/entities/sellers.entity';
import { CustomersRepository } from '../../repository/services/customers.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { SKIP_AUTH } from '../constants/skip-auth';
import { TokenType } from '../enums/token-type.enum';
import { AccessSaveService } from '../services/access-save.service';
import { AuthMapper } from '../services/auth.mapper';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly accessService: AccessSaveService,
    private readonly sellersRepo: SellersRepository,
    private readonly customersRepo: CustomersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const access = request.get('Authorization')?.split('Bearer ')[1];
    if (!access) {
      throw new UnauthorizedException();
    }

    const payload = await this.tokenService.verifyToken(
      access,
      TokenType.ACCESS,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const isAccessExist = await this.accessService.isAccessExist(
      payload.userId,
      payload.role,
      access,
    );
    if (!isAccessExist) {
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
