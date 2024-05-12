import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MapDto {
  @Expose()
  id: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  name: string;

  @Expose()
  kakao_id: string;
}
