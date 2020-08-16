import { NestFactory } from '@nestjs/core';
import { Logger, NestApplicationOptions } from '@nestjs/common';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './lib/logger/logger';
import { setupSwagger } from './lib/swagger/swagger';
import { env } from './env';

async function bootstrap() {
  const logger = env.isProduction
    ? WinstonModule.createLogger(winstonOptions)
    : new Logger('Bootstrap Logger');
    
  // const logger = WinstonModule.createLogger(winstonOptions);

  const nestAppOptions: NestApplicationOptions = {
    logger: logger,
  };

  const app = await NestFactory.create(AppModule, nestAppOptions);

  // global prefix
  app.setGlobalPrefix(env.app.routePrefix || 'api');

  // secure app by setting various HTTP headers.
  // app.use(helmet());

  // enable gzip compression.
  app.use(compression());

  if (env.isDevelopment) {
    app.enableCors();
  }

  // Api docs
  if (env.swagger.enabled) {
    setupSwagger(app);
  }

  const port = env.app.port || 3000;
  await app.listen(port);

  logger.log(`Application is running in "${env.node}" mode`);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
