import axios from 'axios';
import * as https from 'node:https';
import * as crypto from 'node:crypto';

/**
 * SSL Unsafe issye 발생으로 인한 HTTP 요청 Client 구현
 * - refs: https://nodejs.org/en/blog/vulnerability/openssl-november-2022
 */
const httpClient = {
  request: axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,

      // allow legacy server
      secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
    }),
  }),
};

export default httpClient;
