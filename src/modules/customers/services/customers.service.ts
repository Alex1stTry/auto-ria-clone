import { Injectable, NotFoundException } from '@nestjs/common';

import { CarsEntity } from '../../../database/entities/cars.entity';
import { CustomersEntity } from '../../../database/entities/customers.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarsQueryList } from '../../cars/dto/req/cars-query-list.dto';
import { CarsRepository } from '../../repository/services/cars.repository';
import { CustomersRepository } from '../../repository/services/customers.repository';

@Injectable()
export class CustomersService {
  constructor(
    private readonly carsRepo: CarsRepository,
    private readonly customersRepo: CustomersRepository,
  ) {}

  public async getMe(userData: IUserData): Promise<CustomersEntity> {
    return await this.customersRepo.findOneBy({ id: userData.userId });
  }

  public async getCars(
    userData: IUserData,
    query: CarsQueryList,
  ): Promise<CarsEntity[]> {
    return await this.carsRepo.getCars(userData, query);
  }

  public async getCarById(carId: string): Promise<CarsEntity> {
    const car = await this.carsRepo.getCarById(carId);
    if (!car) {
      throw new NotFoundException();
    }
    car.countOfViews += 1;
    await this.carsRepo.save(car);
    return car;
  }
}
