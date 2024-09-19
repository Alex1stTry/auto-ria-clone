import { ModelEntity } from '../../database/entities/model.entity';
import { ModelResDto } from './model.res.dto';

export class ModelMapper {
  public static toResponseDto(data: ModelEntity): ModelResDto {
    return {
      model: data.name,
    };
  }
}
