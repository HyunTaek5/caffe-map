import { MapDto } from 'apps/application/map/dto/res/map.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { PlaceDto } from 'apps/application/place/dto/res/place.dto';

@Exclude()
export class GetMapIdResDto extends MapDto {
  @Expose()
  @Type(() => PlaceDto)
  places: PlaceDto[];
}
