import { Injectable } from '@nestjs/common';
import { CreateMapDto } from 'apps/application/map/dto/req/create-map.dto';
import { crawlKakaoMap } from 'apps/domain/map/crawlKakaoMap';

@Injectable()
export class MapService {
  constructor() {}
  /**
   * 지도 생성
   * - 입력받은 지도 주소에서 크롤링
   * - 크롤링한 데이터를 중복체크 및 저장
   *
   * @param dto CreateMapDto
   */
  async createMap(dto: CreateMapDto) {
    await crawlKakaoMap(dto.mapShareUrl);
  }
}
