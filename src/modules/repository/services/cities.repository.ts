import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CitiesEntity } from '../../../database/entities/cities.entity';

@Injectable()
export class CitiesRepository extends Repository<CitiesEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CitiesEntity, dataSource.manager);
  }
}
