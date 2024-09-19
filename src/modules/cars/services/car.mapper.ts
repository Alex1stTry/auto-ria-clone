import { CarsEntity } from '../../../database/entities/cars.entity';
import { CarResDto } from '../dto/res/car.res.dto';

export class CarMapper {
  public static toCarsListResponseDto(data: CarsEntity[]): CarResDto[] {
    return data.map((item) => this.toCarResDto(item));
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
      salesman: {
        name: data.salesman.name,
        email: data.salesman.email,
        phone: data.salesman.phone,
      },
    };
  }
}
