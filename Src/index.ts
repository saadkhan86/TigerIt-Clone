import cors from "cors";
import env from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import connetion from "./Config/MongoDB";
import Router from "./Routes/Router";
import AdminModel from "./Models/AdminModel";
env.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(Router);
app.use((error: any, req: Request, res: Response, next: Function) => {
  if (error instanceof mongoose.MongooseError) {
    res.status(500).json({ message: error.message.split(".")[0] });
  }
  const status = error.status || 500;
  const message = error.message || "Something Went Wrong";
  res.status(error.status || 500).json({ status, message });
});
connetion().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
});
