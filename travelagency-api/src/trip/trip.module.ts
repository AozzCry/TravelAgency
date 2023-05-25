import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TripResolvers } from './trip.resolver';
import { TripService } from './trip.service';

@Module({
  providers: [TripResolvers, TripService],
  imports: [PrismaModule],
})
export class TripModule {}
