import { Injectable } from '@nestjs/common';

import { CarsEntity } from '../../../database/entities/cars.entity';
import { CitiesEntity } from '../../../database/entities/cities.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarsRepository } from '../../repository/services/cars.repository';
import { CitiesRepository } from '../../repository/services/cities.repository';
import { CarReqDto } from '../dto/req/car.req.dto';

@Injectable()
export class CarsService {
  constructor(
    private readonly carsRepo: CarsRepository,
    private readonly citiesRepo: CitiesRepository,
  ) {}

  public async addCar(
    userData: IUserData,
    dto: CarReqDto,
  ): Promise<CarsEntity> {
    const city = await this.findOrCreateCity(dto.city);

    const car = this.carsRepo.create({
      brand: dto.brand,
      model: dto.model,
      price: dto.price,
      year: dto.year,
      body: dto.body,
      salesman_id: userData.userId,
      city,
    });
    await this.carsRepo.save(car);
    return car;
  }

  private async findOrCreateCity(cityName: string): Promise<CitiesEntity> {
    const city = await this.citiesRepo.findOneBy({ city: cityName });

    if (!city) {
      await this.citiesRepo.save(this.citiesRepo.create({ city: cityName }));
    }

    return city;
  }
}
