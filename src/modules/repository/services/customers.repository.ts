import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CustomersEntity } from '../../../database/entities/customers.entity';

@Injectable()
export class CustomersRepository extends Repository<CustomersEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CustomersEntity, dataSource.manager);
  }
}
