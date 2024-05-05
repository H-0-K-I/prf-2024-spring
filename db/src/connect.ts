import mongoose from "mongoose";

export const connectDb = (conn_str: string) =>
  mongoose
    .connect(conn_str)
    .then(() => console.log("connected to db"))
    .catch((err) => console.error(err));
