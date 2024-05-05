// import { config } from "dotenv";

// config();

import express, { json } from "express";
import { connectDb } from "../../db/src/index";
import { testRouter } from "./routers/test.router";

// connectDb(String(process.env.CONNECTION_STRING))
connectDb("mongodb://localhost:27017");

const PORT = 5000;
const app = express();

app.use(json());

app.all("*", (req, _res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/test", testRouter);

app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
