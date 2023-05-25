import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewTrip, Trip, UpdateTrip } from 'src/graphql.schema';
import { TripService } from './trip.service';

const pubSub = new PubSub();

@Resolver('Trip')
export class TripResolvers {
  constructor(private readonly tripService: TripService) {}

  @Query('trips')
  async trips(): Promise<Trip[]> {
    return this.tripService.findAll();
  }

  @Query('trip')
  async trip(@Args('id') args: string): Promise<Trip> {
    return this.tripService.findOne(args);
  }

  @Mutation('createTrip')
  async create(@Args('input') args: NewTrip): Promise<Trip> {
    const createdTrip = await this.tripService.create(args);
    pubSub.publish('tripCreated', { tripCreated: createdTrip });
    return createdTrip;
  }

  @Mutation('updateTrip')
  async update(@Args('input') args: UpdateTrip): Promise<Trip> {
    return this.tripService.update(args);
  }

  @Mutation('deleteTrip')
  async delete(@Args('id') args: string): Promise<Trip> {
    return this.tripService.delete(args);
  }

  @Subscription('tripCreated')
  tripCreated() {
    return pubSub.asyncIterator('tripCreated');
  }
}
