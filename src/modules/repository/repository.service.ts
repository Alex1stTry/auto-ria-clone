import { Global, Module } from '@nestjs/common';

import { AdminRepository } from './services/admin.repository';
import { CarsRepository } from './services/cars.repository';
import { CitiesRepository } from './services/cities.repository';
import { CustomersRepository } from './services/customers.repository';
import { ManagerRepository } from './services/manager.repository';
import { RefreshTokensRepository } from './services/refresh-tokens.repository';
import { SellersRepository } from './services/sellers.repository';

const repositories = [
  CarsRepository,
  CitiesRepository,
  CustomersRepository,
  SellersRepository,
  RefreshTokensRepository,
  AdminRepository,
  ManagerRepository,
];

@Global()
@Module({
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
