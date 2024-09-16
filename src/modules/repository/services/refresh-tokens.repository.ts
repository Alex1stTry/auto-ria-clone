import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RefreshTokensEntity } from '../../../database/entities/refresh-tokens.entity';

@Injectable()
export class RefreshTokensRepository extends Repository<RefreshTokensEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokensEntity, dataSource.manager);
  }

  public async isRefreshExist(refreshToken: string): Promise<boolean> {
    return await this.exists({ where: { refreshToken } });
  }
}
