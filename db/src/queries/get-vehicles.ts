import vehicleModel from "../schemas/vehicle.schema";

export const getVehicles = async () => {
  return await vehicleModel.find({}).select("-__v").exec();
};
