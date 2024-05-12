import { RentalWithoutId } from "../../../shared/models/rental.model";
import rentalModel from "../schemas/rental.schema";

export const createRental = async (rental: RentalWithoutId) => {
  return await rentalModel.create(rental);
};
