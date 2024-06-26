import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";

//app config

const app = express();
const port = 4000;

//middleware
app.use(express.json()); //passing the request from frontend to backend
app.use(cors()); //access the backend from any frontend

//db connection
connectDB();

//api endpoints that are in use.
app.use("/api/food", foodRouter); //on the route /api/food our food router is working any enpoit added to that is mentioned after that
app.use("/images", express.static("uploads"));
app.unsubscribe("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
}); // HTTP method using which we can request the data from the server

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
