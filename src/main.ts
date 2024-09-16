import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataSource } from 'typeorm';

import { AppModule } from './app.module';
import { AppConfig } from './config/config-type.';
import { CitiesEntity } from './database/entities/cities.entity';
import { Cities } from './db/cities.';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

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
  const citiesRepository = dataSource.getRepository(CitiesEntity);
  await citiesRepository.save(Cities);

  await app.listen(3001, () => {
    Logger.log(`Server started on ${appConfig.host}:${appConfig.port}`);
    Logger.log(`Swagger started on ${appConfig.host}:${appConfig.port}/docs`);
  });
}
bootstrap();
