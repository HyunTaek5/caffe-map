import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class ApplicationLogger implements LoggerService {
  private winstonLogger: winston.Logger;

  constructor() {
    this.winstonLogger = winston.createLogger({
      levels: winston.config.npm.levels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  log(message: any) {
    const logMessage = this.convertToPlainMessage(message);
    this.winstonLogger.info(logMessage);
  }

  warn(message: any) {
    const logMessage = this.convertToPlainMessage(message);
    this.winstonLogger.warn(logMessage);
  }

  debug(message: any) {
    const logMessage = this.convertToPlainMessage(message);
    this.winstonLogger.debug(logMessage);
  }

  error(message: any) {
    if (message instanceof Error) {
      const err = message;
      const logMessage = this.convertToPlainMessage({
        errorMessage: err.message,
        errorStack: err.stack,
      });

      this.winstonLogger.error(logMessage);
    } else {
      const logMessage = this.convertToPlainMessage(message);

      this.winstonLogger.error(logMessage);
    }
  }

  private convertToPlainMessage(message: any) {
    return typeof message === 'string' ? message : JSON.stringify(message);
  }
}
