import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AccessSaveService } from '../../auth/services/access-save.service';
import { TokenService } from '../../auth/services/token.service';
import { AdminRepository } from '../../repository/services/admin.repository';
import { RefreshTokensRepository } from '../../repository/services/refresh-tokens.repository';
import { AdminLogInReqDto } from '../dto/admin.log-in.req.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly tokenService: TokenService,
    private readonly refreshRepository: RefreshTokensRepository,
    private readonly accessRepository: AccessSaveService,
  ) {}

  public async logIn(dto: AdminLogInReqDto): Promise<any> {
    const admin = await this.adminRepository.findOneBy({ email: dto.email });
    if (!admin) {
      throw new UnauthorizedException();
    }
    const password = await bcrypt.compare(dto.password, admin.password);
    if (!password) {
      throw new UnauthorizedException();
    }
    const tokens = await this.tokenService.generateTokens({
      userId: admin.id,
      role: admin.role,
    });
    await Promise.all([
      this.refreshRepository.save(
        this.refreshRepository.create({
          refreshToken: tokens.refreshToken,
        }),
      ),
      this.accessRepository.saveAccess(
        admin.id,
        admin.role,
        tokens.accessToken,
      ),
    ]);
    return { admin, tokens };
  }
}
