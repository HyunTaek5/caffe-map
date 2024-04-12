import { Module } from '@nestjs/common';
import { MapModule } from './map/map.module';
import { ConfigModule } from '@nestjs/config';

const modules = [MapModule];

@Module({
  imports: [...modules, ConfigModule.forRoot({ isGlobal: true })],
  exports: [...modules],
})
export class ApplicationModule {}
