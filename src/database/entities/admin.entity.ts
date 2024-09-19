import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { UserRoleEnum } from '../../common/enum/user-role.enum';
import { BaseModel } from './base-model/base-model';
import { TableNameEnum } from './enum/table-name.enum';
import { RefreshTokensEntity } from './refresh-tokens.entity';

@Entity(TableNameEnum.ADMIN)
export class AdminEntity extends BaseModel {
  @Column('text', { default: 'Admin' })
  name: string;

  @Column('text')
  email: string;

  @Column('text', { default: UserRoleEnum.ADMIN })
  role: string;

  @Column('text')
  password: string;

  @Column('uuid', { nullable: true })
  token_id: string;
  @OneToOne(() => RefreshTokensEntity, (entity) => entity.admin)
  @JoinColumn({ name: 'token_id' })
  token?: RefreshTokensEntity;
}
