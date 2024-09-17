import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { UserRoleEnum } from '../../modules/users/enum/user-role.enum';
import { BaseModel } from './base-model/base-model';
import { TableNameEnum } from './enum/table-name.enum';
import { RefreshTokensEntity } from './refresh-tokens.entity';

@Entity(TableNameEnum.MANAGER)
export class ManagerEntity extends BaseModel {
  @Column('text', { default: 'Admin' })
  name: string;

  @Column('text')
  email: string;

  @Column('text', { default: UserRoleEnum.MANAGER })
  role: string;

  @Column('text')
  password: string;

  @Column('uuid', { nullable: true })
  token_id: string;
  @OneToOne(() => RefreshTokensEntity, (entity) => entity.admin)
  @JoinColumn({ name: 'token_id' })
  token?: RefreshTokensEntity;
}
