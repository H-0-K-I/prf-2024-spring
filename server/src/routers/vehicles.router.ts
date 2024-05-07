import express, { Router } from "express";
import {
  getVehiclesService,
  createVehicleService,
  deleteVehicleService,
  getVehicleByIdService,
  updateVehicleService,
} from "../services/vehicle.service";

export const vehiclesRouter: Router = express.Router();

vehiclesRouter.get("/all", getVehiclesService);
vehiclesRouter.post("/create", createVehicleService);
vehiclesRouter.delete("/delete", deleteVehicleService);
vehiclesRouter.get("/:id", getVehicleByIdService);
vehiclesRouter.put("/update", updateVehicleService);
