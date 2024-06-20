import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://shubham:Bettiah2347@cluster0.llbhebs.mongodb.net/food-del"
    )
    .then(() => console.log("DB connected"));
};
