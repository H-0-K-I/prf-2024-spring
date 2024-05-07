import { Extra } from "../../../shared/models/extras.model";
import extraModel from "../schemas/extra.schema";

export const createExtra = async (extra: Extra) => {
  return await extraModel.create(extra);
};
