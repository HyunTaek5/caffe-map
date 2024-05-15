import { Injectable, NotFoundException } from '@nestjs/common';
import { Place } from '../../../db/kysely/type';
import { db } from '../../../db/kysely/database';
import { GetPlacesDto } from 'apps/application/place/dto/req/get-places.dto';
import {
  IPaginated,
  PaginatedDto,
} from 'apps/domain/common/dto/response-paginate.dto';
import { plainToInstance } from 'class-transformer';
import { PlaceDto } from 'apps/application/place/dto/res/place.dto';

@Injectable()
export class PlaceService {
  constructor() {}

  /**
   * 지도 ID로 해당 지도에 등록된 장소 목록 조회
   *
   * @param dto GetPlacesDto
   *
   * @returns IPaginated<PlaceDto>
   */
  async getPlacesByMapId(dto: GetPlacesDto): Promise<IPaginated<PlaceDto>> {
    const { limit, offset, mapId } = dto;

    const result: PaginatedDto<PlaceDto> = await db
      .transaction()
      .execute(async (tx) => {
        const filterQuery = tx.selectFrom('place').innerJoin(
          (eb) =>
            eb
              .selectFrom('place_map')
              .select([
                'place_map.map_id as map_id',
                'place_map.place_id as place_id',
              ])
              .where('map_id', '=', mapId)
              .as('place_map'),
          (join) => join.onRef('place_map.place_id', '=', 'place.id'),
        );

        const items: Place[] = await filterQuery
          .limit(limit)
          .offset(offset)
          .selectAll()
          .execute();

        const { count } = await filterQuery
          .select((eb) => eb.fn.countAll().as('count'))
          .executeTakeFirstOrThrow();

        return new PaginatedDto(
          plainToInstance(PlaceDto, items),
          count.toString(),
          dto.page,
          dto.itemsPerPage,
        );
      });

    return result;
  }

  /**
   * 장소 ID로 장소 조회
   *
   * @param placeId number
   *
   * @returns PlaceDto
   */
  async getPlaceById(placeId: number): Promise<PlaceDto> {
    const place: Place = await db
      .selectFrom('place')
      .where('id', '=', placeId)
      .selectAll()
      .executeTakeFirst();

    if (!place) {
      throw new NotFoundException('해당 장소 정보가 없습니다.');
    }

    return plainToInstance(PlaceDto, place);
  }
}
