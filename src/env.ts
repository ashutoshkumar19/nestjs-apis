import * as dotenv from 'dotenv';
import * as path from 'path';

import * as pkg from '../package.json';
import {
  getOsEnv,
  getOsEnvOptional,
  getOsPath,
  getOsPaths,
  normalizePort,
  toBool,
  toNumber,
} from './lib/env/utils';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(process.cwd(), `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`),
});

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    name: getOsEnv('APP_NAME'),
    version: (pkg as any).version,
    description: (pkg as any).description,
    host: getOsEnv('APP_HOST'),
    schema: getOsEnv('APP_SCHEMA'),
    routePrefix: getOsEnvOptional('APP_ROUTE_PREFIX'),
    port: parseInt(process.env.PORT || getOsEnvOptional('APP_PORT')),
    banner: toBool(getOsEnv('APP_BANNER')),
    // dirs: {
    //   migrations: getOsPaths('TYPEORM_MIGRATIONS'),
    //   migrationsDir: getOsPath('TYPEORM_MIGRATIONS_DIR'),
    //   entities: getOsPaths('TYPEORM_ENTITIES'),
    //   entitiesDir: getOsPath('TYPEORM_ENTITIES_DIR'),
    //   controllers: getOsPaths('CONTROLLERS'),
    //   middlewares: getOsPaths('MIDDLEWARES'),
    //   interceptors: getOsPaths('INTERCEPTORS'),
    //   subscribers: getOsPaths('SUBSCRIBERS'),
    //   resolvers: getOsPaths('RESOLVERS'),
    // },
  },
  log: {
    level: getOsEnvOptional('LOG_LEVEL'),
    json: toBool(getOsEnvOptional('LOG_JSON')),
    output: getOsEnvOptional('LOG_OUTPUT'),
    path: getOsPath('LOG_PATH'),
  },
  mongodb: {
    uri: getOsEnv('MONGO_URI'),
    // type: getOsEnv('MONGO_CONNECTION'),
    // host: getOsEnvOptional('MONGO_HOST'),
    // port: toNumber(getOsEnvOptional('MONGO_PORT')),
    // username: getOsEnvOptional('MONGO_USERNAME'),
    // password: getOsEnvOptional('MONGO_PASSWORD'),
    // database: getOsEnv('MONGO_DATABASE'),
    // synchronize: toBool(getOsEnvOptional('MONGO_SYNCHRONIZE')),
    // logging: getOsEnv('MONGO_LOGGING'),
  },
  db: {
    type: getOsEnv('TYPEORM_CONNECTION'),
    host: getOsEnvOptional('TYPEORM_HOST'),
    port: toNumber(getOsEnvOptional('TYPEORM_PORT')),
    username: getOsEnvOptional('TYPEORM_USERNAME'),
    password: getOsEnvOptional('TYPEORM_PASSWORD'),
    database: getOsEnv('TYPEORM_DATABASE'),
    synchronize: toBool(getOsEnvOptional('TYPEORM_SYNCHRONIZE')),
    logging: getOsEnv('TYPEORM_LOGGING'),
  },
  jwt: {
    secret: getOsEnv('JWT_SECRET'),
    expiresIn: getOsEnvOptional('JWT_EXPIRY'),
  },
  swagger: {
    enabled: toBool(getOsEnv('SWAGGER_ENABLED')),
    route: getOsEnvOptional('SWAGGER_ROUTE'),
    username: getOsEnv('SWAGGER_USERNAME'),
    password: getOsEnv('SWAGGER_PASSWORD'),
    title: getOsEnvOptional('SWAGGER_TITLE'),
    description: getOsEnvOptional('SWAGGER_DESCRIPTION'),
    version: getOsEnvOptional('SWAGGER_VERSION'),
  },
  // monitor: {
  //   enabled: toBool(getOsEnv('MONITOR_ENABLED')),
  //   route: getOsEnv('MONITOR_ROUTE'),
  //   username: getOsEnv('MONITOR_USERNAME'),
  //   password: getOsEnv('MONITOR_PASSWORD'),
  // },
};
