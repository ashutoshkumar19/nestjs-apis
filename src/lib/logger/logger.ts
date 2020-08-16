import { WinstonModuleOptions } from "nest-winston";
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import {env} from '../../env'
import { getPath } from "../env/utils";

const log_path = env.log.path || getPath('/logs');

export const winstonOptions: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
        winston.format.uncolorize(),
      ),
      filename: log_path + '/combined.log',
      level: 'info'
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
        winston.format.uncolorize(),
      ),
      filename: log_path + '/error.log',
      level: 'error'
    })
  ]
};