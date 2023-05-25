/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewTrip {
  title: string;
  text: string;
}

export class UpdateTrip {
  id: string;
  title?: Nullable<string>;
  text?: Nullable<string>;
  isPublished?: Nullable<boolean>;
}

export class Trip {
  id: string;
  title: string;
  text: string;
  isPublished: boolean;
}

export abstract class IQuery {
  abstract trips(): Trip[] | Promise<Trip[]>;

  abstract trip(id: string): Nullable<Trip> | Promise<Nullable<Trip>>;
}

export abstract class IMutation {
  abstract createTrip(input: NewTrip): Trip | Promise<Trip>;

  abstract updateTrip(
    input: UpdateTrip,
  ): Nullable<Trip> | Promise<Nullable<Trip>>;

  abstract deleteTrip(id: string): Nullable<Trip> | Promise<Nullable<Trip>>;
}

export abstract class ISubscription {
  abstract tripCreated(): Nullable<Trip> | Promise<Nullable<Trip>>;
}

type Nullable<T> = T | null;
