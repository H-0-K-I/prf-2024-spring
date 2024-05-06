import { User } from "../../../shared/models/user.model";
import userModel from "../schemas/user.schema";

export const createUser = async (user: User) => {
  return await userModel.create(user);
};
