import { Module } from '@nestjs/common';
import { MapController } from './map/map.controller';
import { ApplicationModule } from 'apps/application/application.module';

const controllers = [MapController];

@Module({
  imports: [ApplicationModule],
  providers: [ApplicationModule],
  controllers: [...controllers],
})
export class ControllerModule {}
