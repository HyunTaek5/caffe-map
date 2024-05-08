import { IsNumber, IsOptional, IsString, Max } from 'class-validator';
import { Type } from 'class-transformer';

const DEFAULT_ITEMS_PER_PAGE = 30;
const MAX_ITEMS_PER_PAGE = 100;

export class RequestPaginateDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Max(MAX_ITEMS_PER_PAGE)
  itemsPerPage?: number = DEFAULT_ITEMS_PER_PAGE;

  @IsString()
  @IsOptional()
  sort?: string;

  get limit(): number {
    return this.itemsPerPage;
  }

  get offset(): number {
    const page = this.page ?? 1;
    const perPage = this.itemsPerPage;

    return (page - 1) * perPage;
  }

  parseSort(sort?: string): { [key: string]: 'asc' | 'desc' } {
    if (!sort) return {};

    try {
      return JSON.parse(sort);
    } catch (err) {
      return {};
    }
  }
}
