import { Extra } from "../../../shared/models/extras.model";
import { Schema, model } from "mongoose";

const extrasSchema = new Schema<Extra>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model("Extras", extrasSchema);
