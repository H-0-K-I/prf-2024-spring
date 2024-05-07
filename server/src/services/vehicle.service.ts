import { Request, Response } from "express";
import { createVehicle } from "../../../db/src/queries/create-vehicle";
import { getVehicles } from "../../../db/src/queries/get-vehicles";
import { getVehicleById } from "../../../db/src/queries/get-vehicle-by-id";
import { deleteVehicle } from "../../../db/src/queries/delete-vehicle";
import { updateVehicle } from "../../../db/src/queries/update-vehicle";
import { Schema } from "mongoose";

export const createVehicleService = async (req: Request, res: Response) => {
  try {
    const vehicle = req.body;

    await createVehicle(vehicle);
    res.send({});
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getVehiclesService = async (req: Request, res: Response) => {
  try {
    const vehicles = await getVehicles();
    res.json({ vehicles });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getVehicleByIdService = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as Schema.Types.ObjectId;
    const vehicle = await getVehicleById(id);

    if (!vehicle) {
      res.status(400).send("Vehicle missing!");
      return;
    }

    res.json({ vehicle });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateVehicleService = async (req: Request, res: Response) => {
  try {
    const requestVehicle = req.body;

    const dbVehicle = await getVehicleById(requestVehicle.id);

    if (!dbVehicle) {
      res.status(400).send("Vehicle missing!");
      return;
    }

    await updateVehicle(dbVehicle, requestVehicle).save();

    res.json({});
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteVehicleService = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    await deleteVehicle(id);
    res.json({});
  } catch (error) {
    res.status(400).send(error);
  }
};
