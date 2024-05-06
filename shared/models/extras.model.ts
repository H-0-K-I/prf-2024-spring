import { Schema } from "mongoose";

export interface Extra {
  _id: Schema.Types.ObjectId;
  name: string;
}
