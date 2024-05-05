import { User } from "../../../shared/models/user.model";
import { Schema, model } from "mongoose";

const userSchema = new Schema<User>({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
  },
});

export default model("User", userSchema);
