import express from "express";

const router = express.Router();

import {
  getAllExercises,
  createExercise,
} from "../controllers/exercise.controller.js";

router.get("/", getAllExercises);
router.post("/", createExercise);

export default router;
