import * as process from 'node:process';

import { CarsEntity } from '../../../database/entities/cars.entity';
import { CarsResDto } from '../dto/res/cars.res.dto';

export class CarMapper {
  public static toResponseDto(
    cars: CarsEntity[] | CarsEntity,
  ): CarsResDto[] | CarsResDto {
    if (Array.isArray(cars)) {
      return cars.map((car) => ({
        brands: car.brands,
        models: car.models,
        photos: car.photos?.length
          ? car.photos.map(
              (photo) => `${process.env.AWS_S3_BUCKET_URL}/${photo}`,
            )
          : [],
        price: car.price,
        year: car.year,
        body: car.body,
        countOfViews: car.countOfViews,
      }));
    } else {
      return {
        brands: cars.brands,
        models: cars.models,
        price: cars.price,
        photos: cars.photos?.length
          ? cars.photos.map(
              (photo) => `${process.env.AWS_S3_BUCKET_URL}/${photo}`,
            )
          : [],
        year: cars.year,
        body: cars.body,
        countOfViews: cars.countOfViews,
      };
    }
  }
}
