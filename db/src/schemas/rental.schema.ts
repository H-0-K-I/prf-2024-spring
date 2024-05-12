import { Rental } from "../../../shared/models/rental.model";
import { Schema, model } from "mongoose";

const rentalSchema = new Schema<Rental>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: "vehicles",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  extras: [
    {
      type: Schema.Types.ObjectId,
      ref: "extras",
    },
  ],
});

export default model("Rental", rentalSchema);
