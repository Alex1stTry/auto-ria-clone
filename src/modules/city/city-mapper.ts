import { CitiesEntity } from '../../database/entities/cities.entity';
import { CityResDto } from './city.res.dto';

export class CityMapper {
  public static toResponseDto(data: CitiesEntity): CityResDto {
    return {
      city: data.name,
    };
  }
}
