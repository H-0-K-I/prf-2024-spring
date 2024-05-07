import extraModel from "../schemas/extra.schema";

export const getExtras = async () => {
  return await extraModel.find({}).select("-__v").exec();
};
