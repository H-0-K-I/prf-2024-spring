import { Schema } from "mongoose";

export interface Vehicle {
  _id: Schema.Types.ObjectId;
  make: string;
  model: string;
  pricePerDay: number;
}
