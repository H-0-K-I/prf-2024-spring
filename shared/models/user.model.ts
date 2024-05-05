import { Schema } from "mongoose";

export interface User {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}
