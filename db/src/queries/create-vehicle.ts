import { Vehicle } from "../../../shared/models/vehicle.model";
import vehicleModel from "../schemas/vehicle.schema";

export const createVehicle = async (vehicle: Vehicle) => {
  return await vehicleModel.create(vehicle);
};
