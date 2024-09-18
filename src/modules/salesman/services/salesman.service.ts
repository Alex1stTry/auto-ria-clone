import { BadRequestException, Injectable } from '@nestjs/common';

import { CarsEntity } from '../../../database/entities/cars.entity';
import { SellersEntity } from '../../../database/entities/sellers.entity';
import { AccountTypeEnum } from '../../auth/enums/account-type.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarReqDto } from '../../cars/dto/req/car.req.dto';
import { CarsService } from '../../cars/services/cars.service';
import { CarsRepository } from '../../repository/services/cars.repository';
import { SellersRepository } from '../../repository/services/sellers.repository';
import { ContentType } from '../../upload-files/enum/content-type.enum';
import { FileUploadService } from '../../upload-files/file-upload.service';
import { GooglePayService } from './google-pay.service';

@Injectable()
export class SalesmanService {
  constructor(
    private readonly sellersRepo: SellersRepository,
    private readonly googlePay: GooglePayService,
    private readonly carsService: CarsService,
    private readonly carsRepo: CarsRepository,
    private readonly uploadFileService: FileUploadService,
  ) {}
  public async getMe(userData: IUserData): Promise<SellersEntity> {
    return await this.sellersRepo.findOne({
      where: { id: userData.userId },
      relations: ['cars', 'cars.city'],
    });
  }

  public async buyPremium(userData: IUserData): Promise<SellersEntity> {
    const payResult = await this.googlePay.payProcess();

    if (!payResult) {
      throw new BadRequestException('Payment false');
    }
    await this.sellersRepo.update(
      { id: userData.userId },
      { account: AccountTypeEnum.PREMIUM },
    );

    return await this.sellersRepo.findOneBy({ id: userData.userId });
  }

  public async addCar(
    userData: IUserData,
    dto: CarReqDto,
  ): Promise<CarsEntity> {
    return await this.carsService.addCar(userData, dto);
  }

  public async getStatistics(userData: IUserData): Promise<CarsEntity> {
    return await this.carsRepo.getStatistic(userData.userId);
  }

  public async addPhotos(
    userData: IUserData,
    photos: Express.Multer.File[],
  ): Promise<void> {
    const uploadedPhotoPaths: string[] = [];
    for (const photo of photos) {
      const filePath = await this.uploadFileService.uploadFile(
        photo,
        ContentType.CAR_PHOTOS,
        userData.userId,
      );
      uploadedPhotoPaths.push(filePath);
    }
    await this.carsRepo.update(
      { salesman_id: userData.userId },
      { photos: uploadedPhotoPaths },
    );
  }
}
