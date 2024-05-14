import { Module } from '@nestjs/common';
import { MapController } from './map/map.controller';
import { ApplicationModule } from 'apps/application/application.module';
import { PlaceController } from 'apps/front-api/src/place/place.controller';

const controllers = [MapController, PlaceController];

@Module({
  imports: [ApplicationModule],
  providers: [ApplicationModule],
  controllers: [...controllers],
})
export class ControllerModule {}
