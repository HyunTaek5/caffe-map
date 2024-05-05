import { Module } from '@nestjs/common';
import { MapModule } from './map/map.module';
import { ConfigModule } from '@nestjs/config';
import { ApplicationLogger } from 'apps/domain/common/logger/application.logger';

const modules = [MapModule];

@Module({
  imports: [...modules, ConfigModule.forRoot({ isGlobal: true })],
  providers: [ApplicationLogger],
  exports: [...modules, ApplicationLogger],
})
export class ApplicationModule {}
