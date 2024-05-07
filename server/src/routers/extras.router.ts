import express, { Router } from "express";
import {
  createExtraService,
  deleteExtraService,
  getExtrasService,
} from "../services/extra.service";

export const extrasRouter: Router = express.Router();

extrasRouter.get("/all", getExtrasService);
extrasRouter.post("/create", createExtraService);
extrasRouter.delete("/delete", deleteExtraService);
