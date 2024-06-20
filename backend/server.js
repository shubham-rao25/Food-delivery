import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

//app config

const app = express();
const port = 4000;

//middleware
app.use(express.json()); //passing the request from frontend to backend
app.use(cors()); //access the backend from any frontend

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)

app.get("/", (req, res) => {
  res.send("API Working");
}); // HTTP method using which we can request the data from the server

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
