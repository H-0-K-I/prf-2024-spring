import { Document } from "mongoose";
import { Vehicle } from "../../../shared/models/vehicle.model";

export const updateVehicle = (
  dbVehicle: Vehicle,
  requestVehicle: Vehicle
): Document<unknown, {}, Vehicle> => {
  const { make, model, pricePerDay } = requestVehicle;

  dbVehicle.make = make;
  dbVehicle.model = model;
  dbVehicle.pricePerDay = pricePerDay;

  return dbVehicle as unknown as Document<unknown, {}, Vehicle>;
};
