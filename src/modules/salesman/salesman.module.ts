import { Module } from '@nestjs/common';

import { CarModule } from '../cars/car.module';
import { SalesmanController } from './salesman.controller';
import { GooglePayService } from './services/google-pay.service';
import { SalesmanService } from './services/salesman.service';

@Module({
  imports: [CarModule],
  controllers: [SalesmanController],
  providers: [SalesmanService, GooglePayService],
})
export class SalesmanModule {}
