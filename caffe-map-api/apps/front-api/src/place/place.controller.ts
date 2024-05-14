import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { PlaceService } from 'apps/application/place/place.service';
import { GetPlacesDto } from 'apps/application/place/dto/req/get-places.dto';
import {
  BasePaginatedDto,
  PaginatedDto,
} from 'apps/domain/common/dto/response-paginate.dto';
import { PlaceDto } from 'apps/application/place/dto/res/place.dto';

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
}
