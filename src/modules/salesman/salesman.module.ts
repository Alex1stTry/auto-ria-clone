import { Module } from '@nestjs/common';

import { CarModule } from '../cars/car.module';
import { FileUploadModule } from '../upload-files/file-upload.module';
import { SalesmanController } from './salesman.controller';
import { GooglePayService } from './services/google-pay.service';
import { SalesmanService } from './services/salesman.service';

@Module({
  imports: [CarModule, FileUploadModule],
  controllers: [SalesmanController],
  providers: [SalesmanService, GooglePayService],
})
export class SalesmanModule {}
