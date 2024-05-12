import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PlaceDto {
  @Expose()
  id: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  kakao_id: string;
}
