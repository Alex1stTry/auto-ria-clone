import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { UserRoleEnum } from '../../../common/enum/user-role.enum';
import { BcryptConfig, Config } from '../../../config/config-type.';
import { CustomersEntity } from '../../../database/entities/customers.entity';
import { RefreshTokensEntity } from '../../../database/entities/refresh-tokens.entity';
import { SellersEntity } from '../../../database/entities/sellers.entity';
import { CustomersRepository } from '../../repository/services/customers.repository';
import { RefreshTokensRepository } from '../../repository/services/refresh-tokens.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { LoginReqDto } from '../dto/req/login.req.dto';
import { RegisterReqDto } from '../dto/req/register.req.dto';
import { TokensResDto } from '../dto/res/tokens.res.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AccessSaveService } from './access-save.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  bcryptConfig: BcryptConfig;

  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly customersRepository: CustomersRepository,
    private readonly sellersRepository: SellersRepository,
    private readonly tokenService: TokenService,
    private readonly refreshRepository: RefreshTokensRepository,
    private readonly accessService: AccessSaveService,
  ) {
    this.bcryptConfig = configService.get<BcryptConfig>('bcrypt');
  }
  public async register(
    dto: RegisterReqDto,
  ): Promise<{ user: SellersEntity | CustomersEntity; tokens: TokensResDto }> {
    await this.isEmailExist(dto.email, dto.role);
    const password = await bcrypt.hash(
      dto.password,
      this.bcryptConfig.countOfSalt,
    );
    let user: SellersEntity | CustomersEntity;
    switch (dto.role) {
      case UserRoleEnum.CUSTOMER:
        user = await this.customersRepository.save(
          this.customersRepository.create({
            ...dto,
            password,
          }),
        );
        break;
      case UserRoleEnum.SALESMAN:
        user = await this.sellersRepository.save(
          this.sellersRepository.create({
            ...dto,
            password,
          }),
        );
        break;
    }

    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
      role: dto.role,
      accountType: user.account,
    });

    let refreshToken: RefreshTokensEntity;
    switch (dto.role) {
      case UserRoleEnum.CUSTOMER:
        refreshToken = this.refreshRepository.create({
          refreshToken: tokens.refreshToken,
          customer: user as CustomersEntity,
        });
        break;
      case UserRoleEnum.SALESMAN:
        refreshToken = this.refreshRepository.create({
          refreshToken: tokens.refreshToken,
          salesman: user as SellersEntity,
        });
        break;
      default:
        throw new Error('Invalid role');
    }
    await Promise.all([
      this.refreshRepository.save(refreshToken),
      this.accessService.saveAccess(user.id, dto.role, tokens.accessToken),
    ]);
    return { user, tokens };
  }

  public async logIn(
    dto: LoginReqDto,
  ): Promise<{ user: CustomersEntity | SellersEntity; tokens: TokensResDto }> {
    let user: SellersEntity | CustomersEntity;
    switch (dto.role) {
      case UserRoleEnum.CUSTOMER:
        user = await this.customersRepository.findOneBy({ email: dto.email });
        break;
      case UserRoleEnum.SALESMAN:
        user = await this.sellersRepository.findOneBy({ email: dto.email });
        break;
      default:
        throw new Error('Invalid role');
    }
    if (!user) {
      throw new NotFoundException('Not found');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Unauthorized');
    }

    switch (dto.role) {
      case UserRoleEnum.CUSTOMER:
        await Promise.all([
          this.refreshRepository.delete({
            customer_id: user.id,
          }),
          this.accessService.deleteAccess(user.id, dto.role),
        ]);
        break;
      case UserRoleEnum.SALESMAN:
        await Promise.all([
          this.refreshRepository.delete({
            salesman_id: user.id,
          }),
          this.accessService.deleteAccess(user.id, dto.role),
        ]);
        break;
      default:
        throw new Error('Invalid role');
    }

    const tokens = await this.tokenService.generateTokens({
      userId: user.id,
      role: dto.role,
    });

    let refreshToken: RefreshTokensEntity;
    switch (dto.role) {
      case UserRoleEnum.CUSTOMER:
        refreshToken = this.refreshRepository.create({
          refreshToken: tokens.refreshToken,
          customer: user as CustomersEntity,
        });
        break;
      case UserRoleEnum.SALESMAN:
        refreshToken = this.refreshRepository.create({
          refreshToken: tokens.refreshToken,
          salesman: user as SellersEntity,
        });
        break;
      default:
        throw new Error('Invalid role');
    }
    await Promise.all([
      this.refreshRepository.save(refreshToken),
      this.accessService.saveAccess(user.id, dto.role, tokens.accessToken),
    ]);

    return { user, tokens };
  }

  public async logOut(userData: IUserData): Promise<void> {
    switch (userData.role) {
      case UserRoleEnum.SALESMAN:
        await Promise.all([
          this.refreshRepository.delete({
            salesman_id: userData.userId,
          }),
          this.accessService.deleteAccess(userData.userId, userData.role),
        ]);
        break;
      case UserRoleEnum.CUSTOMER:
        await Promise.all([
          this.refreshRepository.delete({
            customer_id: userData.userId,
          }),
          this.accessService.deleteAccess(userData.userId, userData.role),
          this.customersRepository.delete({
            email: userData.email,
          }),
        ]);
        break;
    }
  }

  public async refresh(userData: IUserData): Promise<TokensResDto> {
    switch (userData.role) {
      case UserRoleEnum.CUSTOMER:
        await Promise.all([
          this.refreshRepository.delete({
            customer_id: userData.userId,
          }),
          this.accessService.deleteAccess(userData.userId, userData.role),
        ]);
        break;
      case UserRoleEnum.SALESMAN:
        await Promise.all([
          this.refreshRepository.delete({
            salesman_id: userData.userId,
          }),
          this.accessService.deleteAccess(userData.userId, userData.role),
        ]);
        break;
      default:
        throw new Error('Invalid role');
    }

    const tokens = await this.tokenService.generateTokens({
      userId: userData.userId,
      role: userData.role,
    });

    let refreshToken: RefreshTokensEntity;
    switch (userData.role) {
      case UserRoleEnum.CUSTOMER:
        refreshToken = this.refreshRepository.create({
          refreshToken: tokens.refreshToken,
          customer_id: userData.userId,
        });
        break;
      case UserRoleEnum.SALESMAN:
        refreshToken = this.refreshRepository.create({
          refreshToken: tokens.refreshToken,
          salesman_id: userData.userId,
        });
        break;
      default:
        throw new Error('Invalid role');
    }
    await Promise.all([
      this.refreshRepository.save(refreshToken),
      this.accessService.saveAccess(
        userData.userId,
        userData.role,
        tokens.accessToken,
      ),
    ]);
    return tokens;
  }

  private async isEmailExist(email: string, role: UserRoleEnum): Promise<void> {
    let user: SellersEntity | CustomersEntity;
    switch (role) {
      case UserRoleEnum.CUSTOMER:
        user = await this.customersRepository.findOneBy({ email });
        break;
      case UserRoleEnum.SALESMAN:
        user = await this.sellersRepository.findOneBy({ email });
        break;
      default:
        throw new Error('Invalid role');
    }
    if (user) {
      throw new ConflictException('Email already exist');
    }
  }
}
