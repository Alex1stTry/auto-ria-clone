import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { AccountTypeEnum } from '../../auth/enums/account-type.enum';
import { CarsRepository } from '../../repository/services/cars.repository';

@Injectable()
export class BasicAccountGuard implements CanActivate {
  constructor(private readonly carsRepo: CarsRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.accountType === AccountTypeEnum.BASE) {
      const carsCount = await this.carsRepo.count({
        where: { salesman_id: user.userId },
      });
      if (carsCount >= 1) {
        throw new ForbiddenException(
          'Sorry but you can add only one car with basic account',
        );
      }
    }
    return true;
  }
}
