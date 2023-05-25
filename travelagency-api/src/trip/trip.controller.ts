import { Controller, Get } from '@nestjs/common';
import { Trip } from 'src/graphql.schema';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  async getTrips(): Promise<Trip[]> {
    return this.tripService.findAll();
  }
}
