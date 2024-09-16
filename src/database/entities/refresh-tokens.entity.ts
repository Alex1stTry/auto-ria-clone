import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseModel } from './base-model/base-model';
import { CustomersEntity } from './customers.entity';
import { TableNameEnum } from './enum/table-name.enum';
import { SellersEntity } from './sellers.entity';

@Entity(TableNameEnum.REFRESH_TOKENS)
export class RefreshTokensEntity extends BaseModel {
  @Column('text')
  refreshToken: string;

  @Column({ nullable: true })
  salesman_id: string;
  @OneToOne(() => SellersEntity, (entity) => entity.tokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'salesman_id' })
  salesman?: SellersEntity;

  @Column({ nullable: true })
  customer_id: string;
  @OneToOne(() => CustomersEntity, (entity) => entity.tokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer?: CustomersEntity;
}
