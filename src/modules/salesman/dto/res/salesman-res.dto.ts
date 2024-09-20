import { CarResDto } from '../../../cars/dto/res/cur-res.dto';

export class SalesmanResDto {
  name: string;
  email: string;
  phone: string;
  cars?: CarResDto[];
  account?: string;
}
