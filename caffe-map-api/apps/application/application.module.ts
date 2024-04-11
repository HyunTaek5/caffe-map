import { Module } from '@nestjs/common';
import { MapModule } from './map/map.module';

const modules = [MapModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class ApplicationModule {}
