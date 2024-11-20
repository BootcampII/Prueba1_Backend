import express from "express";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

process.loadEnvFile();

const app = express();

connectDB();
app.use(express.json());

app.use(userRoutes);
app.use(authRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
