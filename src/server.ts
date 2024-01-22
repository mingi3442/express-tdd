import express, { NextFunction, Request, Response } from "express";
import router from "./routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = 8080;
const mongoURL = process.env.MONGODB_URL as string;

export const app = express();
app.use(express.json());

app.use("/product", router);

app.listen(PORT, async () => {
  await mongoose.connect(mongoURL);
  console.log(`Server is running on port ${PORT}.`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
