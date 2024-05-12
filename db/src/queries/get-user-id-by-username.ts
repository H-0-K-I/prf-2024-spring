import userModel from "../schemas/user.schema";

export const getUserIdByUsername = async (username: string) => {
  return await userModel.findOne({ username: username }).select("_id").exec();
};
