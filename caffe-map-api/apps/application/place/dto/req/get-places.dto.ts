import { RequestPaginateDto } from 'apps/domain/common/dto/request-paginate.dto';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetPlacesDto extends RequestPaginateDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  mapId: number;
}
