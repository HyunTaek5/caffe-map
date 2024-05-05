import { IsString, Matches } from 'class-validator';

export class CreateMapDto {
  /**
   * 카카오맵 즐겨찾기 공유 주소
   *
   * @example https://kko.to/2kwn5Ap-5r
   */
  @IsString()
  @Matches(/^https?:\/\/(www\.)?(kko\.to\/\w+|map\.kakao\.com\/)/, {
    message: '올바른 카카오맵 즐겨찾기 공유 주소를 입력해주세요.',
  })
  mapShareUrl: string;
}
