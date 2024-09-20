import { Column, Entity, JoinColumn, ManyToOne, VirtualColumn } from 'typeorm';

import { BaseModel } from './base-model/base-model';
import { BrandEntity } from './brand.entity';
import { CitiesEntity } from './cities.entity';
import { TableNameEnum } from './enum/table-name.enum';
import { ModelEntity } from './model.entity';
import { SellersEntity } from './sellers.entity';

@Entity(TableNameEnum.CARS)
export class CarsEntity extends BaseModel {
  @ManyToOne(() => BrandEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'brand_id' })
  brand?: BrandEntity;

  @ManyToOne(() => ModelEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'model_id ' })
  model?: ModelEntity;

  @Column('int')
  price: number;

  @Column('int')
  year: number;

  @Column('text')
  body: string;

  @Column('text', { array: true, nullable: true })
  photos?: string[];

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

  @VirtualColumn({ query: () => 'NULL' })
  averagePriceUa: number;

  @VirtualColumn({ query: () => 'NULL' })
  averagePriceCity: number;
}
