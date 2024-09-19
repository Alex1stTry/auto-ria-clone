import { SellersEntity } from '../../../database/entities/sellers.entity';
import { CarMapper } from '../../cars/services/car.mapper';
import { SalesmanResDto } from '../dto/res/salesman-res.dto';

export class SalesmanMapper {
  public static toResponseDtoWithCars(data: any): any {
    const cars = data.cars ? CarMapper.toCarsListResponseDto(data.cars) : null;
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      created: data.created,
      account: data.account,
      cars: Array.isArray(cars) ? cars : cars ? [cars] : [],
    };
  }
  public static toResponseDto(data: SellersEntity): SalesmanResDto {
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
  }
}
