import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MapService } from 'apps/application/map/map.service';
import { CreateMapDto } from 'apps/application/map/dto/req/create-map.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMapListDto } from 'apps/application/map/dto/req/get-map-list.dto';

@ApiTags('maps')
@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @ApiOperation({
    summary: '지도 목록 조회',
    description: '지도 목록 조회',
  })
  @Get()
  async getMapList(@Query() dto: GetMapListDto) {
    return this.mapService.getMapList(dto);
  }

  @ApiOperation({
    summary: '지도 생성',
    description: '카카오 즐겨찾기 공유하기 | 기본 주소로 지도 생성',
  })
  @Post()
  async createMap(@Body() dto: CreateMapDto): Promise<void> {
    await this.mapService.createMap(dto);
  }
}
