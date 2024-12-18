import express from "express";
import connectDB from "./db/config.js";
import apiRouter from "./routes/apiRouter.js";
import cors from "cors";

process.loadEnvFile();

const app = express();
app.use(cors());

connectDB();
app.use(express.json());

app.use(apiRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
