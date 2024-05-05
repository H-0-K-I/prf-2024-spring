import userModel from "../schemas/user.schema";

export const getTest = async () => {
  return await userModel.find().exec();
};
