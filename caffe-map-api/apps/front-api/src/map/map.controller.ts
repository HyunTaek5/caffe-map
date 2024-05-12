import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MapService } from 'apps/application/map/map.service';
import { CreateMapDto } from 'apps/application/map/dto/req/create-map.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMapListDto } from 'apps/application/map/dto/req/get-map-list.dto';
import {
  BasePaginatedDto,
  IPaginated,
} from 'apps/domain/common/dto/response-paginate.dto';
import { MapDto } from 'apps/application/map/dto/res/map.dto';
import { GetMapIdResDto } from 'apps/application/map/dto/res/get-map-id-res.dto';

@ApiTags('maps')
@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @ApiOperation({
    summary: '지도 목록 조회',
    description: '지도 목록 조회',
    operationId: 'getMapList',
  })
  @ApiOkResponse({
    type: BasePaginatedDto<MapDto>(MapDto, 'MapDto'),
    isArray: true,
  })
  @Get()
  async getMapList(@Query() dto: GetMapListDto): Promise<IPaginated<MapDto>> {
    return this.mapService.getMapList(dto);
  }

  @ApiOperation({
    summary: '지도 상세 조회',
    description: '지도 id로 상세 조회',
    operationId: 'getMapById',
  })
  @ApiOkResponse({ type: GetMapIdResDto })
  @Get('/:id')
  async getMapById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetMapIdResDto> {
    return this.mapService.getMapById(id);
  }

  @ApiOperation({
    summary: '카카오맵 링크로 지도 import',
    description: '카카오 즐겨찾기 공유하기 | 기본 주소로 지도 생성',
    operationId: 'importMapFromKakao',
  })
  @Post('/import')
  async importMap(@Body() dto: CreateMapDto): Promise<void> {
    await this.mapService.createMap(dto);
  }
}
