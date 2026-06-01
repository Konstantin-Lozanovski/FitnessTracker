import { config } from "dotenv";

config({ path: `.env` });

export const { PORT, JWT_SECRET, JWT_LIFETIME, MONGO_URI } = process.env;
