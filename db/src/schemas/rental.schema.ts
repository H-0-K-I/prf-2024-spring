import { Rental } from "../../../shared/models/rental.model";
import { Schema, model } from "mongoose";

const rentalSchema = new Schema<Rental>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  duration: [
    {
      type: Date,
      required: true,
    },
  ],
  extras: [
    {
      type: Schema.Types.ObjectId,
      ref: "Extras",
    },
  ],
});

export default model("Rental", rentalSchema);
