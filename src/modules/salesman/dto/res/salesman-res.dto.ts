import { CarResDto } from '../../../cars/dto/res/car-res.dto';

export class SalesmanResDto {
  name: string;
  email: string;
  phone: string;
  account?: string;
  cars?: CarResDto[];
}
