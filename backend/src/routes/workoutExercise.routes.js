import express from "express";
import {
  addExerciseToWorkout,
  deleteWorkoutExercise,
  updateWorkoutExercise,
} from "../controllers/workoutExercise.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/", addExerciseToWorkout);
router.delete("/:id", deleteWorkoutExercise);
router.patch("/:id", updateWorkoutExercise);

export default router;
