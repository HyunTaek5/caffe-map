import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMapDto } from 'apps/application/map/dto/req/create-map.dto';
import { crawlKakaoMap } from 'apps/domain/map/crawlKakaoMap';
import { PrismaService } from 'apps/application/prisma/prisma.service';
import {
  CrawlPlaceResult,
  ResponseCrawlData,
} from 'apps/domain/map/type/crawlPlace.type';
import { GetMapListDto } from 'apps/application/map/dto/req/get-map-list.dto';
import { db } from '../../../db/kysely/database';
import {
  IPaginated,
  PaginatedDto,
} from 'apps/domain/common/dto/response-paginate.dto';
import { Map, Place } from '../../../db/kysely/type';
import { plainToInstance } from 'class-transformer';
import { MapDto } from 'apps/application/map/dto/res/map.dto';
import { GetMapIdResDto } from 'apps/application/map/dto/res/get-map-id-res.dto';

@Injectable()
export class MapService {
  constructor(private readonly prisma: PrismaService) {}
  /**
   * 지도 생성
   * - 입력받은 지도 주소에서 크롤링
   * - 크롤링한 데이터를 중복체크 및 저장
   *
   * @param dto CreateMapDto
   */
  async createMap(dto: CreateMapDto): Promise<void> {
    const crawlData: ResponseCrawlData = await crawlKakaoMap(dto.mapShareUrl);

    const mapInfo = crawlData.mapInfo[0];

    let mapId: number;

    await this.prisma.$transaction(async (tx) => {
      // 지도 중복 체크 후 없으면 생성
      const existMap = await this.prisma.map.findFirst({
        where: {
          name: mapInfo.title,
        },
      });

      if (!existMap) {
        const { id: createMapId } = await tx.map.create({
          data: {
            name: mapInfo.title,
            kakaoId: mapInfo.folderId.toString(),
          },
        });

        mapId = createMapId;
      } else {
        // 이미 존재하는 지도라면 해당 지도의 id를 가져옴
        mapId = existMap.id;
      }

      const promises: Promise<{
        mapId: number;
        placeId: number;
      }>[] = crawlData.placeList.map(async (crawlPlace: CrawlPlaceResult) => {
        const existPlace = await this.prisma.place.findFirst({
          where: {
            kakaoId: crawlPlace.key,
          },
        });

        if (!existPlace) {
          const { id: createPlaceId } = await tx.place.create({
            data: {
              kakaoId: crawlPlace.key,
              name: crawlPlace.display1,
              address: crawlPlace.display2,
              latitude: crawlPlace.x,
              longitude: crawlPlace.y,
            },
          });

          return {
            mapId: mapId,
            placeId: createPlaceId,
          };
        } else {
          return {
            mapId: mapId,
            placeId: existPlace.id,
          };
        }
      });

      await Promise.all(promises).then(async (mapPlaceResult) => {
        // 지도와 장소 연결
        await tx.placeMap.createMany({
          data: mapPlaceResult,
          skipDuplicates: true,
        });
      });
    });
  }

  /**
   * 지도 목록 조회
   *
   * @param dto GetMapListDto
   *
   * @returns IPaginated<MapDto>
   */
  async getMapList(dto: GetMapListDto): Promise<IPaginated<MapDto>> {
    const { limit, offset } = dto;

    const result = await db.transaction().execute(async (trx) => {
      const items: Map[] = await trx
        .selectFrom('map')
        .where('is_deleted', '=', false)
        .limit(limit)
        .offset(offset)
        .selectAll()
        .execute();

      const { count } = await trx
        .selectFrom('map')
        .where('is_deleted', '=', false)
        .select((expressionBuilder) => {
          return expressionBuilder.fn.countAll().as('count');
        })
        .executeTakeFirstOrThrow();

      return new PaginatedDto(
        plainToInstance(MapDto, items),
        count.toString(),
        dto.page,
        dto.itemsPerPage,
      );
    });

    return result;
  }

  /**
   * id로 지도 상세 조회
   *
   * @param id number
   *
   * @returns GetMapIdResDto
   */
  async getMapById(id: number): Promise<GetMapIdResDto> {
    const map: Map = await db
      .selectFrom('map')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!map) {
      throw new NotFoundException('해당 지도 정보가 없습니다.');
    }

    const places: Place[] = await db
      .selectFrom('place')
      .innerJoin(
        (eb) =>
          eb
            .selectFrom('place_map')
            .select([
              'place_map.map_id as map_id',
              'place_map.place_id as place_id',
            ])
            .where('map_id', '=', id)
            .as('place_map'),
        (join) => join.onRef('place_map.place_id', '=', 'place.id'),
      )
      .selectAll()
      .execute();

    return plainToInstance(GetMapIdResDto, { ...map, places: places });
  }
}
