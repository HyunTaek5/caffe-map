import { PaginationMetaData } from 'apps/domain/common/dto/pagination-meta-data.dto';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export interface IPaginated<T> {
  items: T[];
  pagination: PaginationMetaData;
}

export function BasePaginatedDto<E>(
  DtoClass: Type<E>,
  resourceName?: string,
): Type<IPaginated<E>> {
  class PaginatedHost<D> implements IPaginated<D> {
    @ApiProperty({ isArray: true, type: () => DtoClass })
    items: D[];

    @ApiProperty({ type: () => PaginationMetaData })
    pagination: PaginationMetaData;

    constructor(
      items: D[],
      totalItemCount: number,
      currentPage: number,
      itemsPerPage: number,
    ) {
      const totalPage = Math.ceil(totalItemCount / itemsPerPage);

      this.items = items;
      this.pagination = {
        totalItemCount,
        currentItemCount: items.length,
        totalPage: totalPage === 0 ? 1 : totalPage,
        currentPage,
        itemsPerPage,
      };
    }
  }

  if (resourceName) {
    Object.defineProperty(PaginatedHost, 'name', {
      writable: false,
      value: `Paginated${resourceName}ListDto`,
    });
  }

  return PaginatedHost;
}

export class PaginatedDto<T> implements IPaginated<T> {
  items: T[];
  pagination: PaginationMetaData;

  constructor(
    items: T[],
    totalItemCount: string,
    currentPage: number,
    itemsPerPage: number,
  ) {
    const totalPage = Math.ceil(+totalItemCount / itemsPerPage);

    this.items = items;
    this.pagination = {
      totalItemCount: +totalItemCount,
      currentItemCount: items.length,
      totalPage: totalPage === 0 ? 1 : totalPage,
      currentPage,
      itemsPerPage,
    };
  }
}
