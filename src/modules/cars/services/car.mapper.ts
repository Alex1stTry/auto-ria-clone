import { CarsEntity } from '../../../database/entities/cars.entity';
import { CarResDto } from '../dto/res/car-res.dto';
import { CarStatisticResDto } from '../dto/res/car-statistic.res.dto';
import { CarResDtoWithUser } from '../dto/res/car-user.res.dto';

export class CarMapper {
  public static toCarsListResponseDto(data: CarsEntity[]): CarResDtoWithUser[] {
    return data.map((item) => this.toCarResDtoWithUser(item));
  }
  public static toCarResDtoWithUser(data: CarsEntity): CarResDtoWithUser {
    return {
      id: data.id,
      brand: data.brand.name,
      model: data.model.name,
      price: data.price,
      year: data.year,
      body: data.body,
      photos: data.photos
        ? data.photos.map(
            (photo) => `${process.env.AWS_S3_BUCKET_URL}/${photo}`,
          )
        : [],
      city: data.city.name,
      salesman: {
        name: data.salesman?.name,
        email: data.salesman?.email,
        phone: data.salesman?.phone,
      },
    };
  }
  public static toCarResDto(data: CarsEntity): CarResDto {
    return {
      id: data.id,
      brand: data.brand.name,
      model: data.model.name,
      price: data.price,
      year: data.year,
      body: data.body,
      photos: data.photos,
      city: data.city.name,
    };
  }
  public static toCarStatisticDto(data: any): CarStatisticResDto {
    return {
      id: data.car_id,
      brand: data.brand_name,
      model: data.model_name,
      price: data.car_price,
      year: data.car_year,
      body: data.car_body,
      photos: data.car_photos,
      city: data.city_name,
      countOfViews: data.car_countOfViews,
      averagePriceCity: data.averagepricecity,
      averagePriceUa: data.averagepriceua,
    };
  }
  public static toCarStatistic(data: any[]): CarStatisticResDto[] {
    return data.map((car) => this.toCarStatisticDto(car));
  }
}
