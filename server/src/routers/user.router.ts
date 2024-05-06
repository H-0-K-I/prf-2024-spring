import express, { Router } from "express";
import { createUserService, loginUserService } from "../services/user.service";

export const userRouter: Router = express.Router();

userRouter.post("/register", createUserService);
userRouter.post("/login", loginUserService);
