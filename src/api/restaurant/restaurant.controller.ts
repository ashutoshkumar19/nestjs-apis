import { Controller, Get, Req, UseGuards, Inject } from '@nestjs/common';
import { Request } from 'express';
import { Logger } from 'winston';
import { AuthGuard } from '@nestjs/passport';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
// @UseGuards(AuthGuard())
export class RestaurantController {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,

    private restaurantService: RestaurantService,
  ) {}

  private logRequest(req: Request) {
    this.logger.info(`${req.method}: ${req.url}`);
  }
  private logData(data: any) {
    this.logger.info(`${data}`);
  }

  @Get()
  getRestaurants(@Req() req: Request): any {
    this.logRequest(req);
    return this.restaurantService.getRestaurants();
  }
}
