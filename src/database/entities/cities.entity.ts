import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base-model/base-model';
import { CarsEntity } from './cars.entity';
import { TableNameEnum } from './enum/table-name.enum';

@Entity(TableNameEnum.CITIES)
export class CitiesEntity extends BaseModel {
  @Column('text')
  name: string;

  @OneToMany(() => CarsEntity, (entity) => entity.city)
  cars?: CarsEntity[];
}
