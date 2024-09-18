import { Module } from '@nestjs/common';

import { MailerModule } from '../mailer/mailer.module';
import { CarsService } from './services/cars.service';

@Module({
  imports: [MailerModule],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarModule {}
