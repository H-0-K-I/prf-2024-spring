import userModel from "../schemas/user.schema";

export const getUser = async (username: string) => {
  return await userModel.findOne({ username: username }).select("-__v").exec();
};
