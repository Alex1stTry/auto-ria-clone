import { BrandEntity } from '../../../../database/entities/brand.entity';
import { CitiesEntity } from '../../../../database/entities/cities.entity';
import { ModelEntity } from '../../../../database/entities/model.entity';

export class CarsResDto {
  public readonly brands?: BrandEntity;

  public readonly models?: ModelEntity;

  public readonly price: number;

  public readonly year: number;

  public readonly body: string;

  public readonly photos?: string[];

  public readonly city?: CitiesEntity;

  public readonly countOfViews: number;
}
