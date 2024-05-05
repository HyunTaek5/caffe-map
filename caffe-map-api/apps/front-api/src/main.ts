import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from 'apps/domain/common/pipe/validation.pipe';
import { json, urlencoded } from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationLogger } from 'apps/domain/common/logger/application.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));

  app.useLogger(new ApplicationLogger());
  app.useGlobalPipes(new CustomValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Caffe Map API')
    .setDescription('카페 맵 서비스 프론트 API 문서')
    .setVersion('0.0.1')
    .build();

  if (process.env.APP_ENV === 'development') {
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.API_PORT || 8000);
}
bootstrap();
