import express from "express";

const router = express.Router();

import {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
} from "../controllers/workout.controller.js";

router.post("/", createWorkout);
router.get("/", getAllWorkouts);
router.patch("/:workoutId", updateWorkout);
router.get("/:workoutId", getWorkoutById);
router.delete("/:workoutId", deleteWorkout);

export default router;
