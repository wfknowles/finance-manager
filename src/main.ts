import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BASE, HOST_NAME, HTTP_PORT, VERSION } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  const _HOST_NAME = configService.get<string>(HOST_NAME);
  const _HTTP_PORT = Number(configService.get<string>(HTTP_PORT));

  /* 
    Swagger Docs
  */
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('The service API description')
    .setVersion(`${VERSION}`)
    .addServer(`/v${VERSION}`)
    // .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/v${VERSION}/${BASE}/docs`, app, document);

  /*
    Middleware
  */
  app.setGlobalPrefix(`/v${VERSION}`);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  
  /*
    Start Service
  */
  await app.listen(_HTTP_PORT);
  Logger.log(`Nest application ready on http://${_HOST_NAME}:${_HTTP_PORT}`, 'NestApplication');
}

bootstrap();
