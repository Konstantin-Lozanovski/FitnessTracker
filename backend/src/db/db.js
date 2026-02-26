import mongoose from "mongoose";
import { MONGO_URI_LOCAL, MONGO_URI_ATLAS, NODE_ENV } from "../config/env.js";

const getMongoUri = () => {
  if (NODE_ENV === "production") {
    return MONGO_URI_ATLAS;
  }
  return MONGO_URI_LOCAL;
};

export const connectDB = async () => {
  await mongoose.connect(getMongoUri());
  console.log("✅ MongoDB connected successfully");
};
