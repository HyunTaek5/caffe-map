import { Body, Controller, Post } from '@nestjs/common';
import { MapService } from 'apps/application/map/map.service';
import { CreateMapDto } from 'apps/application/map/dto/req/create-map.dto';

@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post()
  async createMap(@Body() dto: CreateMapDto) {
    await this.mapService.createMap(dto);
  }
}
