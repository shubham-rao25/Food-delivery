import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

//if model is already available it will use that
//if model is not present then it will create a new model of the same name

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
