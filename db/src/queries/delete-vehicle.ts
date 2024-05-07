import { Schema } from "mongoose";
import vehicleModel from "../schemas/vehicle.schema";

export const deleteVehicle = async (id: Schema.Types.ObjectId) => {
  return await vehicleModel.deleteOne({ _id: id }).exec();
};
