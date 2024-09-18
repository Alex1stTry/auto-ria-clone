import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AdminConfig } from '../../../config/config-type.';
import { CarsEntity } from '../../../database/entities/cars.entity';
import { CitiesEntity } from '../../../database/entities/cities.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { MailerService } from '../../mailer/mailer.service';
import { CarsRepository } from '../../repository/services/cars.repository';
import { CitiesRepository } from '../../repository/services/cities.repository';
import { CarReqDto } from '../dto/req/car.req.dto';

@Injectable()
export class CarsService {
  adminConfig: AdminConfig;
  constructor(
    private readonly carsRepo: CarsRepository,
    private readonly citiesRepo: CitiesRepository,
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.adminConfig = this.configService.get<AdminConfig>('admin');
  }

  public async addCar(
    userData: IUserData,
    dto: CarReqDto,
  ): Promise<CarsEntity> {
    const city = await this.findOrCreateCity(dto.city);

    const brands = await this.carsRepo.getAllBrands();
    if (brands.length === 0) {
      await this.mailService.sendMail();
      throw new BadRequestException(
        `Unfortunately, ${dto.brand} brands are not in the database, but we are already working on it.`,
      );
    }
    const brand = brands[0];
    const model = await this.carsRepo.getModelsByBrand(brand.id, dto.model);
    if (!model) {
      await this.mailService.sendMail();
      throw new BadRequestException(
        `Unfortunately, ${dto.model} models are not in the database, but we are already working on it.`,
      );
    }
    const car = this.carsRepo.create({
      brands: brand,
      models: model,
      price: dto.price,
      year: dto.year,
      body: dto.body,
      salesman_id: userData.userId,
      city,
    });
    await this.carsRepo.save(car);
    return car;
  }

  private async findOrCreateCity(cityName: string): Promise<CitiesEntity> {
    let city = await this.citiesRepo.findOneBy({ city: cityName });

    if (!city) {
      city = await this.citiesRepo.save(
        this.citiesRepo.create({ city: cityName }),
      );
    }

    return city;
  }
}
