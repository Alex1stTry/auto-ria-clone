import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BrandEntity } from '../../../database/entities/brand.entity';
import { CarsEntity } from '../../../database/entities/cars.entity';
import { ModelEntity } from '../../../database/entities/model.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarsQueryList } from '../../cars/dto/req/cars-query-list.dto';
import { BrandRepository } from './brand.repository';
import { ModelRepository } from './model.repository';

@Injectable()
export class CarsRepository extends Repository<CarsEntity> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly brandsRepo: BrandRepository,
    private readonly modelRepo: ModelRepository,
  ) {
    super(CarsEntity, dataSource.manager);
  }

  public async getStatistic(salesman_id: string): Promise<any> {
    const cars = await this.createQueryBuilder('cars')
      .leftJoinAndSelect('cars.brand', 'brand')
      .leftJoinAndSelect('cars.model', 'model')
      .where('cars.salesman_id = :salesmanId', { salesmanId: salesman_id })
      .getMany();

    const averagePriceResultUa = await this.createQueryBuilder('cars')
      .leftJoin('cars.brand', 'brand')
      .leftJoin('cars.model', 'model')
      .select('brand.name', 'brand')
      .addSelect('model.name', 'model')
      .addSelect('ROUND(AVG(cars.price))', 'averagePrice')
      .groupBy('brand.name')
      .addGroupBy('model.name')
      .getRawMany();

    const averagePriceInResultCity = await this.createQueryBuilder('cars')
      .leftJoin('cars.brand', 'brand')
      .leftJoin('cars.modes', 'model')
      .leftJoin('cars.city', 'city')
      .select('brand.name', 'brand')
      .addSelect('model.name', 'model')
      .addSelect('city.name', 'city')
      .groupBy('brand.name')
      .addGroupBy('model.name')
      .addGroupBy('city.name')
      .getRawMany();

    const averagePricesInUa = averagePriceResultUa.map((result) => ({
      brand: result.brand,
      model: result.model,
      averagePrice: parseFloat(result.averagePrice),
    }));

    const averagePriceInCity = averagePriceInResultCity.map((result) => ({
      brand: result.brand,
      model: result.model,
      city: result.city,
      averagePrice: parseFloat(result.averagePrice),
    }));
    return {
      cars,
      averagePricesInUa,
      averagePriceInCity,
    };
  }

  public async getAllBrands(): Promise<BrandEntity[]> {
    return await this.brandsRepo.find();
  }

  public async getModelsByBrand(
    brandId: string,
    name: string,
  ): Promise<ModelEntity> {
    return await this.modelRepo.findOne({
      where: {
        name,
        brand: {
          id: brandId,
        },
      },
    });
  }
  public async getCars(
    userData: IUserData,
    query: CarsQueryList,
  ): Promise<CarsEntity[]> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.brand', 'brand');
    qb.leftJoinAndSelect('car.model', 'model');
    qb.leftJoinAndSelect('car.city', 'city');
    qb.leftJoinAndSelect('car.salesman', 'salesman');

    qb.take(query.limit);
    qb.skip(query.offset);

    if (query.search) {
      qb.where('CONCAT(brand.name, model.name) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    return await qb.getMany();
  }

  public async getCarById(carId: string): Promise<CarsEntity> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.brand', 'brand');
    qb.leftJoinAndSelect('car.model', 'model');
    qb.leftJoinAndSelect('car.salesman', 'salesman');
    qb.leftJoinAndSelect('car.city', 'city');
    qb.where('car.id = :carId', { carId });
    return await qb.getOne();
  }
}
