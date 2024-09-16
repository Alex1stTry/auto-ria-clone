import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config, JwtConfig } from '../../../config/config-type.';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AccessSaveService {
  jwtConfig: JwtConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = configService.get('jwt');
  }

  public async saveAccess(
    userId: string,
    role: string,
    token: string,
  ): Promise<void> {
    const key = this.getKey(userId, role);

    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.accessExpireIn);
  }

  public async isAccessExist(
    userId: string,
    role: string,
    token: string,
  ): Promise<boolean> {
    const key = this.getKey(userId, role);

    const set = await this.redisService.sMembers(key);
    return set.includes(token);
  }

  public async deleteAccess(userId: string, role: string): Promise<void> {
    const key = this.getKey(userId, role);
    await this.redisService.deleteByKey(key);
  }

  private getKey(userId: string, role: string) {
    return `ACCESS_TOKEN:${userId}-${role}`;
  }
}
