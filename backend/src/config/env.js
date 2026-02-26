import { config } from "dotenv";

config({ path: `.env` });

export const {
  PORT,
  JWT_SECRET,
  JWT_LIFETIME,
  MONGO_URI_LOCAL,
  MONGO_URI_ATLAS,
  NODE_ENV,
} = process.env;
