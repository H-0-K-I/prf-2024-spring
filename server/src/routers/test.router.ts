import express, { Router } from "express";
import { testGetService } from "../services/test.service";

export const testRouter: Router = express.Router();

testRouter.get("/", testGetService);
