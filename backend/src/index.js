import express from "express";
import cors from "cors";
import "express-async-errors";
import { PORT } from "./config/env.js";
import { connectDB } from "./db/db.js";

// Routers
import authRouter from "./routes/auth.routes.js";

//Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/authentication.js";

const app = express();

// app.use("/api/user", authenticateUser, userRouter)

//Routes
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

//
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
};

start();
