import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { ApplicationLogger } from 'apps/domain/common/logger/application.logger';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private logger: ApplicationLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    req.on('close', () => {
      const {
        headers: reqHeaders,
        ip,
        ips,
        method,
        originalUrl: url,
        params,
        query,
        body,
      } = req;

      this.logger.log({
        method,
        url,
        params,
        query,
        body,
        reqHeaders,
        ip,
        ips,
      });
    });

    const resWrite = res.write;
    const resEnd = res.end;
    const chunks: any[] = [];

    res.write = function (chunk: any, ...rest: any) {
      chunks.push(chunk);
      return resWrite.apply(res, [chunk, ...rest]);
    };

    res.end = function (chunk: any, ...rest: any) {
      if (chunk) {
        chunks.push(chunk);
      }

      return resEnd.apply(res, [chunk, ...rest]);
    };

    res.on('close', () => {
      const {
        headers: reqHeaders,
        ip,
        ips,
        method,
        originalUrl: url,
        params,
        query,
        body,
      } = res.req;
      const { statusCode, statusMessage } = res;
      const resHeaders = res.getHeaders();

      if (statusCode >= 400) {
        const errBody = JSON.parse(Buffer.concat(chunks).toString('utf8'));

        this.logger.error({
          method,
          url,
          params,
          query,
          body,
          statusCode,
          statusMessage,
          errBody,
          reqHeaders,
          resHeaders,
          ip,
          ips,
        });
      } else {
        this.logger.log({
          method,
          url,
          params,
          query,
          body,
          statusCode,
          statusMessage,
          reqHeaders,
          resHeaders,
          ip,
          ips,
        });
      }
    });

    next();
  }
}
