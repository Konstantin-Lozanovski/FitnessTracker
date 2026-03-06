import express from "express";
import {
  addExerciseToWorkout,
  deleteWorkoutExercise,
  updateWorkoutExercise,
  deleteSetFromWorkoutExercise,
} from "../controllers/workoutExercise.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/", addExerciseToWorkout);
router.patch("/:id", updateWorkoutExercise);
router.delete("/:id", deleteWorkoutExercise);
router.delete("/:id/sets/:setId", deleteSetFromWorkoutExercise);

export default router;
