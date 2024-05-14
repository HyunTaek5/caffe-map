import { Module } from '@nestjs/common';
import { PlaceService } from 'apps/application/place/place.service';

@Module({
  providers: [PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
