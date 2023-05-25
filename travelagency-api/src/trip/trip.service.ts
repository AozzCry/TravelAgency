import { Injectable } from '@nestjs/common';
import { NewTrip, Trip, UpdateTrip } from 'src/graphql.schema';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<Trip | null> {
    return this.prisma.trip.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Trip[]> {
    return this.prisma.trip.findMany({});
  }

  async create(input: NewTrip): Promise<Trip> {
    return this.prisma.trip.create({
      data: input,
    });
  }

  async update(params: UpdateTrip): Promise<Trip> {
    const { id, ...params_without_id } = params;

    return this.prisma.trip.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
    });
  }

  async delete(id: string): Promise<Trip> {
    return this.prisma.trip.delete({
      where: {
        id,
      },
    });
  }
}
