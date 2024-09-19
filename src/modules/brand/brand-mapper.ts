import { BrandEntity } from '../../database/entities/brand.entity';
import { BrandResDto } from './brand.res.dto';

export class BrandMapper {
  public static toResponseDto(data: BrandEntity): BrandResDto {
    return {
      brand: data.name,
    };
  }
}
