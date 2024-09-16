import { Column, Entity, OneToOne } from 'typeorm';

import { BaseModel } from './base-model/base-model';
import { TableNameEnum } from './enum/table-name.enum';
import { RefreshTokensEntity } from './refresh-tokens.entity';

@Entity(TableNameEnum.CUSTOMERS)
export class CustomersEntity extends BaseModel {
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

  @OneToOne(() => RefreshTokensEntity, (entity) => entity.customer)
  tokens?: RefreshTokensEntity;
}
