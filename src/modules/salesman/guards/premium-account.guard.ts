import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { AccountTypeEnum } from '../../auth/enums/account-type.enum';

@Injectable()
export class PremiumAccountGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.accountType === AccountTypeEnum.PREMIUM) {
      return true;
    }
    throw new ForbiddenException(
      'This function available only for premium accounts',
    );
  }
}
