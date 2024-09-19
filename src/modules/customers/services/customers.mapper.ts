import { CustomersEntity } from '../../../database/entities/customers.entity';
import { CustomerResDto } from '../dto/res/customer.res.dto';

export class CustomersMapper {
  public static toResponseDto(data: CustomersEntity): CustomerResDto {
    return {
      name: data.name,
      email: data.email,
      createdAt: data.created,
    };
  }
}
