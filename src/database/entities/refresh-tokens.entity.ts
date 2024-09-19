import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { AdminEntity } from './admin.entity';
import { BaseModel } from './base-model/base-model';
import { CustomersEntity } from './customers.entity';
import { TableNameEnum } from './enum/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { SellersEntity } from './sellers.entity';

@Entity(TableNameEnum.REFRESH_TOKENS)
export class RefreshTokensEntity extends BaseModel {
  @Column('text')
  refreshToken: string;

  @Column({ nullable: true })
  salesman_id: string;
  @OneToOne(() => SellersEntity, (entity) => entity.tokens)
  @JoinColumn({ name: 'salesman_id' })
  salesman?: SellersEntity;

  @Column({ nullable: true })
  customer_id: string;
  @OneToOne(() => CustomersEntity, (entity) => entity.tokens)
  @JoinColumn({ name: 'customer_id' })
  customer?: CustomersEntity;

  @OneToOne(() => AdminEntity, (entity) => entity.token)
  admin?: AdminEntity;

  @OneToOne(() => ManagerEntity, (entity) => entity.token)
  manager?: ManagerEntity;
}
