import { env } from '../env';

export const mongoConfig: any = {
  mongoUri: env.mongodb.uri,
  options: { useNewUrlParser: true },
};
