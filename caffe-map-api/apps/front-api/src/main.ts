import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from '../../domain/common/pipe/validation.pipe';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));

  app.useGlobalPipes(new CustomValidationPipe());

  await app.listen(process.env.API_PORT || 8000);
}
bootstrap();
