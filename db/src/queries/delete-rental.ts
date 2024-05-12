import { Schema } from "mongoose";
import rentalModel from "../schemas/rental.schema";

export const deleteRental = async (id: Schema.Types.ObjectId) => {
  return await rentalModel.deleteOne({ _id: id }).exec();
};
