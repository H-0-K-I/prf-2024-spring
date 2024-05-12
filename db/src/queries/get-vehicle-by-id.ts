import { Schema } from "mongoose";
import vehicleModel from "../schemas/vehicle.schema";

export const getVehicleById = async (id: Schema.Types.ObjectId) => {
  return await vehicleModel.findById(id).select("-__v").exec();
};
