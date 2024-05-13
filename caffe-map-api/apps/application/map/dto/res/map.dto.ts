import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MapDto {
  /**
   * 지도 ID
   *
   * @example 1
   */
  @Expose()
  id: number;

  /**
   * 생성일
   *
   * @example 2024-05-14T00:00:00
   */
  @Expose()
  created_at: Date;

  /**
   * 수정일
   *
   * @example 2024-05-14T00:00:00
   */
  @Expose()
  updated_at: Date;

  /**
   * 지도 이름
   *
   * @example '카페 맵'
   */
  @Expose()
  name: string;

  /**
   * 카카오 지도 ID
   *
   * @example '1234567890'
   */
  @Expose()
  kakao_id: string;
}
