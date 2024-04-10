/* eslint-disable */
import { Knex } from 'knex';

const environment = process.env.APP_ENV || 'development';
const config = require('../knex/knex,config.js')[environment];

export const knex: Knex = require('knex')(config);
