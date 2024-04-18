import { IsString } from 'class-validator';

export class CreateMapDto {
  /**
   * 카카오맵 즐겨찾기 공유 주소
   *
   * @example https://kko.to/2kwn5Ap-5r
   */
  @IsString()
  mapShareUrl: string;
}
