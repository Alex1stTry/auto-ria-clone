import { CarsResDto } from '../../../cars/dto/res/cars.res.dto';

export class SalesmanResDto {
  public readonly name: string;

  public readonly email: string;

  public readonly phone: string;

  public readonly account: string;

  public readonly created: Date;

  public readonly cars?: CarsResDto | CarsResDto[];
}
