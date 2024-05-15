import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PlaceService } from 'apps/application/place/place.service';
import { GetPlacesDto } from 'apps/application/place/dto/req/get-places.dto';
import {
  BasePaginatedDto,
  PaginatedDto,
} from 'apps/domain/common/dto/response-paginate.dto';
import { PlaceDto } from 'apps/application/place/dto/res/place.dto';
import { NotFoundException } from 'apps/domain/common/exceptions/not-found.exception';

@ApiTags('places')
@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiOperation({
    summary: '장소 목록 조회',
    description: '장소 목록 조회',
    operationId: 'getPlaces',
  })
  @ApiOkResponse({
    type: BasePaginatedDto(PlaceDto, 'Place'),
    isArray: true,
  })
  @Get()
  async getPlaces(@Query() dto: GetPlacesDto): Promise<PaginatedDto<PlaceDto>> {
    return this.placeService.getPlacesByMapId(dto);
  }

  @ApiOperation({
    summary: '장소 상세 조회',
    description: '장소 상세 조회',
    operationId: 'getPlaceById',
  })
  @ApiNotFoundResponse({
    description: '해당 id의 장소 정보가 없을시 해당 에러 반환',
    type: NotFoundException('해당 장소 정보가 없습니다.'),
  })
  @Get('/:id')
  async getPlaceById(@Param('id', ParseIntPipe) id: number): Promise<PlaceDto> {
    return this.placeService.getPlaceById(id);
  }
}
