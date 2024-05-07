import { Schema } from "mongoose";
import extraModel from "../schemas/extra.schema";

export const deleteExtra = async (id: Schema.Types.ObjectId) => {
  return await extraModel.deleteOne({ _id: id }).exec();
};
