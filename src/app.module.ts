import { Module } from '@nestjs/common';
import { TasksModule } from './api/tasks/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from './database/mongo.config';
import { AuthModule } from './api/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './lib/logger/logger';
import { RestaurantModule } from './api/restaurant/restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot(mongoConfig.mongoUri, mongoConfig.options),
    WinstonModule.forRoot(winstonOptions),
    AuthModule,
    TasksModule,
    RestaurantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
