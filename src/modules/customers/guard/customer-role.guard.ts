import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRoleEnum } from '../../../common/enum/user-role.enum';

export class CustomerRoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === UserRoleEnum.SALESMAN) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
