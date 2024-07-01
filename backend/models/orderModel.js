import mongoose, { Mongoose } from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  item: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, deafult: "Food Processing" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
});

//if model already present will use that else will create a new model of name order
const orderModel = mongoose.model.order || mongoose.model("order", orderSchema);

export default orderModel;
