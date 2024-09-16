import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base-model/base-model';
import { CitiesEntity } from './cities.entity';
import { TableNameEnum } from './enum/table-name.enum';
import { SellersEntity } from './sellers.entity';

@Entity(TableNameEnum.CARS)
export class CarsEntity extends BaseModel {
  @Column('text')
  brand: string;

  @Column('text')
  model: string;

  @Column('int')
  price: number;

  @Column('int')
  year: number;

  @Column('text')
  body: string;

  @Column('uuid')
  city_id: string;

  @ManyToOne(() => CitiesEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'city_id' })
  city?: CitiesEntity;

  @Column('uuid')
  salesman_id: string;

  @ManyToOne(() => SellersEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'salesman_id' })
  salesman?: SellersEntity;

  @Column('int', { default: 0 })
  countOfViews: number;
}
