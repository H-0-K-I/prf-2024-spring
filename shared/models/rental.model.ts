import { Schema } from "mongoose";

export interface Rental {
  _id: Schema.Types.ObjectId;
  userId?: Schema.Types.ObjectId;
  vehicleId?: Schema.Types.ObjectId;
  date: Date;
  extras: Array<Schema.Types.ObjectId>;
}

export interface PopulatedRental {
  _id: Schema.Types.ObjectId;
  userId: { username: string };
  vehicleId: { make: string; model: string };
  date: Date;
  extras: Array<{ name: string }>;
}

export type RentalWithoutId = Omit<Rental, "_id">;
