import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { env } from '../../env';

export function setupSwagger(app: INestApplication): any {
  const options = new DocumentBuilder()
    .setTitle(env.swagger.title || 'NestJS Api Boilerplate')
    .setDescription(env.swagger.description || 'The Boilerplate API Documentation')
    .setVersion(env.swagger.version || '1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  const swagger_route = env.swagger.route || '/swagger';

  SwaggerModule.setup(swagger_route, app, document);
}
