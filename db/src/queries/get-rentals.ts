import rentalModel from "../schemas/rental.schema";
import userModel from "../schemas/user.schema";
import vehicleModel from "../schemas/vehicle.schema";
import extraModel from "../schemas/extra.schema";

export const getRentals = async () => {
  return await rentalModel
    .find({})
    .populate("userId", "_id username", userModel)
    .populate("vehicleId", "_id make model", vehicleModel)
    .populate("extras", "_id name", extraModel)
    .select("-__v")
    .exec();
};
