import { Schema } from "mongoose";

export interface Rental {
  _id: Schema.Types.ObjectId;
  userId?: Schema.Types.ObjectId;
  vehicleId?: Schema.Types.ObjectId;
  duration: Array<Date>;
  extras: Array<Schema.Types.ObjectId>;
}
