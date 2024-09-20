import { SalesmanResDto } from '../../../salesman/dto/res/salesman-res.dto';

export class BaseCarResDto {
  id: string;

  brand?: string;

  model?: string;

  price: number;

  year: number;

  body: string;

  photos: string[];

  city?: string;

  salesman: SalesmanResDto;

  countOfViews: number;
}
