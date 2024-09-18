import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BrandEntity } from '../../../database/entities/brand.entity';
import { CarsEntity } from '../../../database/entities/cars.entity';
import { ModelEntity } from '../../../database/entities/model.entity';
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
      .leftJoinAndSelect('cars.brands', 'brand')
      .leftJoinAndSelect('cars.models', 'model')
      .where('cars.salesman_id = :salesmanId', { salesmanId: salesman_id })
      .getMany();

    const averagePriceResult = await this.createQueryBuilder('cars')
      .leftJoin('cars.brands', 'brand')
      .leftJoin('cars.models', 'model')
      .select('brand.name', 'brand') // Изменено на 'brand.name'
      .addSelect('model.name', 'model') // Изменено на 'model.name'
      .addSelect('ROUND(AVG(cars.price))', 'averagePrice')
      .groupBy('brand.name')
      .addGroupBy('model.name')
      .getRawMany();

    const averagePrices = averagePriceResult.map((result) => ({
      brand: result.brand,
      model: result.model,
      averagePrice: parseFloat(result.averagePrice),
    }));
    return {
      cars,
      averagePrices,
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
}
