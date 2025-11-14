import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const initDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    if (uri) {
      return await mongoose.connect(uri);
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export default initDB;
