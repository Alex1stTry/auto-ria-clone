import { Column, Entity } from 'typeorm';

import { UserRoleEnum } from '../../modules/users/enum/user-role.enum';
import { BaseModel } from './base-model/base-model';
import { TableNameEnum } from './enum/table-name.enum';

@Entity(TableNameEnum.MANAGER)
export class ManagerEntity extends BaseModel {
  @Column('text', { default: 'Admin' })
  name: string;

  @Column('text')
  email: string;

  @Column('text', { default: UserRoleEnum.MANAGER })
  role: string;
}
