// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.KNEX_DB_HOST,
      port: process.env.KNEX_DB_PORT,
      user: process.env.KNEX_DB_USER,
      password: process.env.KNEX_DB_PASSWORD,
      database: process.env.KNEX_DB_NAME,
      charset: 'utf8',
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      host: process.env.KNEX_DB_HOST,
      port: process.env.KNEX_DB_PORT,
      user: 'username',
      database: 'my_db',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.KNEX_DB_HOST,
      port: process.env.KNEX_DB_PORT,
      user: 'username',
      password: 'password',
      database: 'my_db',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  test: {
    client: 'mysql',
    connection: {
      host: process.env.KNEX_DB_HOST,
      port: 33081,
      user: 'user',
      password: 'password',
      database: 'caffe-map-test-db',
    },
    pool: {
      min: 1,
      max: 1,
    },
  },
};
