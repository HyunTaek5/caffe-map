import { createPool } from 'mysql2'; // do not use 'mysql2/promises'!
import { Kysely, MysqlDialect } from 'kysely';
import { Database } from './type';

const dialect = new MysqlDialect({
  pool: createPool({
    database: process.env.KYSELY_DB_NAME,
    host: process.env.KYSELY_DB_HOST,
    user: process.env.KYSELY_DB_USER,
    password: process.env.KYSELY_DB_PASSWORD,
    port: +process.env.KYSELY_DB_PORT,
    connectionLimit: 10,
  }),
});

export const db: Kysely<Database> = new Kysely<Database>({
  dialect,
});
