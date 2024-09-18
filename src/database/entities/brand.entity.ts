import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from './base-model/base-model';
import { CarsEntity } from './cars.entity';
import { TableNameEnum } from './enum/table-name.enum';
import { ModelEntity } from './model.entity';

@Entity(TableNameEnum.BRAND)
export class BrandEntity extends BaseModel {
  @Column('text')
  name: string;

  @OneToMany(() => CarsEntity, (entity) => entity.brands)
  cars?: CarsEntity[];

  @OneToMany(() => ModelEntity, (entity) => entity.brand)
  models?: ModelEntity;
}
