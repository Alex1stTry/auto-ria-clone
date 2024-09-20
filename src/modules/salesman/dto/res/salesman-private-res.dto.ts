import { CarStatisticResDto } from '../../../cars/dto/res/car-statistic.res.dto';

export class SalesmanPrivateResDto {
  name: string;
  email: string;
  phone: string;
  account: string;
  cars?: CarStatisticResDto[] | CarStatisticResDto;
}
