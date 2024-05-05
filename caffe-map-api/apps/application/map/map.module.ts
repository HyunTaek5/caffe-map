import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { PrismaService } from 'apps/application/prisma/prisma.service';

@Module({
  providers: [MapService, PrismaService],
  exports: [MapService],
})
export class MapModule {}
