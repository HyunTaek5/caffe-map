import { Body, Controller, Post } from '@nestjs/common';
import { MapService } from 'apps/application/map/map.service';
import { CreateMapDto } from 'apps/application/map/dto/req/create-map.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('maps')
@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @ApiOperation({
    summary: '지도 생성',
    description: '카카오 즐겨찾기 공유하기 | 기본 주소로 지도 생성',
  })
  @Post()
  async createMap(@Body() dto: CreateMapDto): Promise<void> {
    await this.mapService.createMap(dto);
  }
}
