import cors from "cors";
import express from "express";

// import stimuliRouter from "./routes/stimuli.ts";

import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import initDB from "./database/mongo";
import { ErrorAdjusted } from "./types/server";

dotenv.config();

const PORT = 8080;
const ORIGIN = process.env.ORIGIN;
const app = express();
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
  })
);
app.use(express.json());

// app.use("/api/stimuli", stimuliRouter);

app.set("trust proxy", 1);

initDB();
app.listen(PORT, async () => {
  console.log(`server starting on port ${PORT}`);
});

// error handler
app.use(function (
  error: ErrorAdjusted,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Error: ", error.message);
  error.status = error.status || 500;

  const response = {
    status: error.status,
    message: error.message,
  };

  return res.status(error.status).send(response);
});

export default app;
