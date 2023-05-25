import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TripController } from './trip/trip.controller';
import { TripModule } from './trip/trip.module';
import { TripService } from './trip/trip.service';

@Module({
  imports: [
    TripModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  controllers: [TripController],
  providers: [PrismaService, TripService, AppService],
})
export class AppModule {}
