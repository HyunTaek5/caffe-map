/* eslint-disable */
import { Knex } from 'knex';

const environment = process.env.APP_ENV || 'development';
const config = require('../knex/knex,config.js')[environment];

export class CustomKnexProvider<T> {
  knex: Knex<T>;

  constructor() {
    this.knex = <Knex<T>>require('knex')(config);
  }
}
