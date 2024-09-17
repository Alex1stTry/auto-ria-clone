import { CarsEntity } from '../../../database/entities/cars.entity';
import { CarsResDto } from '../dto/res/cars.res.dto';

export class CarMapper {
  public static toResponseDto(
    cars: CarsEntity[] | CarsEntity,
  ): CarsResDto[] | CarsResDto {
    if (Array.isArray(cars)) {
      return cars.map((car) => ({
        brand: car.brand,
        model: car.model,
        price: car.price,
        year: car.year,
        body: car.body,
        countOfViews: car.countOfViews,
      }));
    } else {
      return {
        brand: cars.brand,
        model: cars.model,
        price: cars.price,
        year: cars.year,
        body: cars.body,
        countOfViews: cars.countOfViews,
      };
    }
  }
}
