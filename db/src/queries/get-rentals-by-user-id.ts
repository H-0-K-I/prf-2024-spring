import rentalModel from "../schemas/rental.schema";
import userModel from "../schemas/user.schema";
import vehicleModel from "../schemas/vehicle.schema";
import extraModel from "../schemas/extra.schema";

export const getRentalsByUserId = async (userId: string) => {
  return await rentalModel
    .find({ userId: userId })
    .populate("userId", "_id username", userModel)
    .populate("vehicleId", "_id make model", vehicleModel)
    .populate("extras", "_id name", extraModel)
    .select("-__v")
    .exec();
};
