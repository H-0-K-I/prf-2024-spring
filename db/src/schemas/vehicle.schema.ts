import { Vehicle } from "../../../shared/models/vehicle.model";
import { Schema, model } from "mongoose";

const vehicleSchema = new Schema<Vehicle>({
  make: {
    type: String,
    required: true,
    minlength: 1,
  },
  model: {
    type: String,
    required: true,
    minlength: 1,
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default model("Vehicle", vehicleSchema);
