import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SellersEntity } from '../../../database/entities/sellers.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';

@Injectable()
export class SellersRepository extends Repository<SellersEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SellersEntity, dataSource.manager);
  }
  public async getAllInfo(userData: IUserData): Promise<SellersEntity> {
    const qb = this.createQueryBuilder('salesman');
    qb.leftJoinAndSelect('salesman.cars', 'car');
    qb.leftJoinAndSelect('car.city', 'city');
    qb.leftJoinAndSelect('car.brand', 'brand');
    qb.leftJoinAndSelect('car.model', 'model');
    qb.where('salesman.id = :id', { id: userData.userId });

    return await qb.getOne();
  }
}
