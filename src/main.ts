import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');

  console.log(process.env.ENVIRONMENT);

  if (process.env.ENVIRONMENT === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Sound Voyage API - Pandora Tech Solutions')
      .setDescription('API for sign terms and contracts')
      .setVersion('0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  app.use(urlencoded({ extended: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
