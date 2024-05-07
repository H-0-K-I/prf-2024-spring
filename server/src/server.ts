// import { config } from "dotenv";

// config();

import express, { json } from "express";
import { connectDb } from "../../db/src/index";
import { userRouter } from "./routers/user.router";
import cors from "cors";
import { vehiclesRouter } from "./routers/vehicles.router";

// connectDb(String(process.env.CONNECTION_STRING))
connectDb("mongodb://localhost:27017");

const PORT = 5000;
const app = express();

const whitelist = ["http://localhost:4200"];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allowed: boolean) => void
  ) => {
    if (whitelist.includes(origin!)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(json());

app.all("*", (req, _res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/users", userRouter);
app.use("/api/vehicles", vehiclesRouter);
// app.use("/api/extras", extrasRouter);
// app.use("/api/rentals", rentalsRouter);

app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
