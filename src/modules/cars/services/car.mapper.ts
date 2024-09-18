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
        year: cars.year,
        body: cars.body,
        countOfViews: cars.countOfViews,
      };
    }
  }
}
