import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseModel } from './base-model/base-model';
import { CarsEntity } from './cars.entity';
import { TableNameEnum } from './enum/table-name.enum';
import { RefreshTokensEntity } from './refresh-tokens.entity';

@Entity(TableNameEnum.SELLERS)
export class SellersEntity extends BaseModel {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  phone: string;

  @Column('text', { default: 'base' })
  account: string;

  @OneToOne(() => RefreshTokensEntity, (entity) => entity.salesman)
  tokens?: RefreshTokensEntity;

  @Column('uuid', { nullable: true })
  car_id: string;

  @OneToMany(() => CarsEntity, (entity) => entity.salesman)
  @JoinColumn({ name: 'car_id' })
  cars?: CarsEntity[] | CarsEntity;
}
