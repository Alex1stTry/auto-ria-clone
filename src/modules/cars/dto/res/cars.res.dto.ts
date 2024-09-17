import { CitiesEntity } from '../../../../database/entities/cities.entity';

export class CarsResDto {
  public readonly brand: string;

  public readonly model: string;

  public readonly price: number;

  public readonly year: number;

  public readonly body: string;

  public readonly city?: CitiesEntity;

  public readonly countOfViews: number;
}
