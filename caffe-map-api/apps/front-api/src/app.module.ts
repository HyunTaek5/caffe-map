import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ControllerModule } from './controller.module';
import { HttpLoggerMiddleware } from 'apps/domain/common/logger/http-logger.middleware';
import { ApplicationLogger } from 'apps/domain/common/logger/application.logger';

@Module({
  imports: [ControllerModule],
  providers: [HttpLoggerMiddleware, ApplicationLogger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
