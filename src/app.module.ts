import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CarModule } from './modules/cars/car.module';
import { CustomersModule } from './modules/customers/customers.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { SalesmanModule } from './modules/salesman/salesman.module';
import { SeedModule } from './modules/seed/seed.module';
import { FileUploadModule } from './modules/upload-files/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    PostgresModule,
    RedisModule,
    RepositoryModule,
    AdminModule,
    SalesmanModule,
    CarModule,
    MailerModule,
    FileUploadModule,
    CustomersModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
