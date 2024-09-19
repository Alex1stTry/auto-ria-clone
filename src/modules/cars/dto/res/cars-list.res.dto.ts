import { CarsEntity } from '../../../../database/entities/cars.entity';

export class CarsListResDto {
  cars: CarsEntity[];
  total: number;
}
