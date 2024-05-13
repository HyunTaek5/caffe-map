import { ApiProperty } from '@nestjs/swagger';
import { ExceptionType } from 'apps/domain/common/exceptions/exception.type';

export function NotFoundException(message: string) {
  class NotFoundHost implements ExceptionType {
    @ApiProperty({ example: message })
    message: string;

    @ApiProperty({ example: 'Not Found' })
    error: string;

    @ApiProperty({ example: 404 })
    statusCode: number;
  }

  return NotFoundHost;
}
