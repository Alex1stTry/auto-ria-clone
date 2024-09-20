import { SellersEntity } from '../../../database/entities/sellers.entity';
import { CarMapper } from '../../cars/services/car.mapper';
import { SalesmanPremiumResDto } from '../dto/res/salesman-premium.res.dto';
import { SalesmanResDto } from '../dto/res/salesman-res.dto';

export class SalesmanMapper {
  public static toResponseDtoWithCars(data: any): SalesmanResDto {
    const cars = data.cars ? CarMapper.toCarsListResponseDto(data.cars) : null;
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      account: data.account,
      cars,
    };
  }
  public static toResponseDto(data: SellersEntity): SalesmanPremiumResDto {
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      account: data.account,
    };
  }
}
