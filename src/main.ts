import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

import { AppModule } from './app.module';
import { AdminConfig, AppConfig, BcryptConfig } from './config/config-type.';
import { AdminEntity } from './database/entities/admin.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  const adminConfig = configService.get<AdminConfig>('admin');
  const bcryptConfig = configService.get<BcryptConfig>('bcrypt');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AlexCars')
    .setDescription('The cars API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 4,
      persistAuthorization: true,
    },
  });

  const dataSource = app.get(DataSource);

  const adminRepository = dataSource.getRepository(AdminEntity);

  const existingAdmin = await adminRepository.findOne({
    where: { email: adminConfig.email },
  });
  if (!existingAdmin) {
    const hashPass = await bcrypt.hash(
      adminConfig.password,
      bcryptConfig.countOfSalt,
    );
    const newAdmin = adminRepository.create({
      name: adminConfig.name,
      password: hashPass,
      email: adminConfig.email,
    });
    await adminRepository.save(newAdmin);
  }

  await app.listen(3001, () => {
    Logger.log(`Server started on ${appConfig.host}:${appConfig.port}`);
    Logger.log(`Swagger started on ${appConfig.host}:${appConfig.port}/docs`);
  });
}
bootstrap();
