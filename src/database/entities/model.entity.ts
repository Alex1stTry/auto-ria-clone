import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './base-model/base-model';
import { BrandEntity } from './brand.entity';
import { CarsEntity } from './cars.entity';
import { TableNameEnum } from './enum/table-name.enum';

@Entity(TableNameEnum.MODEL)
export class ModelEntity extends BaseModel {
  @Column('text')
  name: string;

  @ManyToOne(() => BrandEntity, (entity) => entity.models)
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;

  @OneToMany(() => CarsEntity, (entity) => entity.models)
  cars?: CarsEntity[];
}
