import mongoose from "mongoose";
process.loadEnvFile();

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
