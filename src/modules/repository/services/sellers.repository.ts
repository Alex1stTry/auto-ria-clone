import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SellersEntity } from '../../../database/entities/sellers.entity';

@Injectable()
export class SellersRepository extends Repository<SellersEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SellersEntity, dataSource.manager);
  }
}
