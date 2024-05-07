import { Request, Response } from "express";
import { createExtra } from "../../../db/src/queries/create-extra";
import { getExtras } from "../../../db/src/queries/get-extras";
import { deleteExtra } from "../../../db/src/queries/delete-extra";

export const createExtraService = async (req: Request, res: Response) => {
  try {
    const extra = req.body;

    await createExtra(extra);
    res.send({});
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getExtrasService = async (req: Request, res: Response) => {
  try {
    const extras = await getExtras();
    res.json({ extras });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteExtraService = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    await deleteExtra(id);
    res.json({});
  } catch (error) {
    res.status(400).send(error);
  }
};
