import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dot from "dotenv";
import { ConnectDB } from "./connection.js";
import router from "./Routes/urlRoute.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/", router);

dot.config();

app.listen(process.env.PORT || 3000, async () => {
  await ConnectDB();
  console.log(`Server Started on Port ${process.env.PORT || 3000}`);
});
