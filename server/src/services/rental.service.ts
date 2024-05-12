import e, { Request, Response } from "express";
import { createRental } from "../../../db/src/queries/create-rental";
import { getRentals } from "../../../db/src/queries/get-rentals";
import { deleteRental } from "../../../db/src/queries/delete-rental";
import { getUserIdByUsername } from "../../../db/src/queries/get-user-id-by-username";
import { getRentalsByUserId } from "../../../db/src/queries/get-rentals-by-user-id";
import { Schema } from "mongoose";

export const createRentalService = async (req: Request, res: Response) => {
  try {
    const requestBody = req.body;

    const userId = await getUserIdByUsername(requestBody.username);

    if (!userId) {
      res.status(400).send("user missing!");
      return;
    }

    const rental = {
      vehicleId: requestBody.vehicleId as Schema.Types.ObjectId,
      userId: String(userId!._id) as unknown as Schema.Types.ObjectId,
      date: requestBody.date as Date,
      extras: requestBody.extras as Array<Schema.Types.ObjectId>,
    };

    await createRental(rental);

    res.send({});
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getRentalsByUsernameService = async (
  req: Request,
  res: Response
) => {
  try {
    const username = req.params.username;

    const userId = await getUserIdByUsername(username);

    if (!userId) {
      res.status(400).send("user missing!");
      return;
    }

    const rentals = await getRentalsByUserId(String(userId!._id));

    res.send({ rentals });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getRentalsService = async (req: Request, res: Response) => {
  try {
    const rentals = await getRentals();
    res.json({ rentals });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const deleteRentalService = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    await deleteRental(id);
    res.json({});
  } catch (error) {
    res.status(400).send(error);
  }
};
