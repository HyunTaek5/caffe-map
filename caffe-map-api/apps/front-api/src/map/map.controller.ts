import { Controller } from '@nestjs/common';
import { MapService } from 'apps/application/map/map.service';

@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}
}
