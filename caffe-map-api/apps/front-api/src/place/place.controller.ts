import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { PlaceService } from 'apps/application/place/place.service';

@ApiTags('places')
@Controller('places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}
}
