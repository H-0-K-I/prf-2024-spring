import express, { Router } from "express";
import {
  getRentalsService,
  createRentalService,
  deleteRentalService,
  getRentalsByUsernameService,
} from "../services/rental.service";

export const rentalsRouter: Router = express.Router();

rentalsRouter.get("/all", getRentalsService);
rentalsRouter.post("/create", createRentalService);
rentalsRouter.delete("/delete", deleteRentalService);
rentalsRouter.get("/:username", getRentalsByUsernameService);
