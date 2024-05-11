import { PaginationMetaData } from 'apps/domain/common/dto/pagination-meta-data.dto';

export interface IPaginated<T> {
  items: T[];
  pagination: PaginationMetaData;
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
