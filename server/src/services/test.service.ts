import { Request, Response } from "express";
import { getTest } from "../../../db/src/queries/get-test";

export const testGetService = async (req: Request, res: Response) => {
  try {
    const result = await getTest();
    res.json({ result });
    // res.json({ Hello: "hello" });
  } catch (error) {
    res.status(400).send(error);
  }
};
