import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectConnection()
    private connection: Connection,
  ) {}

  private getDocs(docs: any): any{
    return JSON.parse(JSON.stringify(docs));
  }

  /* Get all restaurants */
  async getRestaurants(): Promise<any> {
    const result = await this.connection.collection('restaurant_details').find().toArray();
    return result;
  }
}
