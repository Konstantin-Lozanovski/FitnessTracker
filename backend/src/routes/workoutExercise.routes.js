import express from "express";
import {
  addExerciseToWorkout,
  deleteWorkoutExercise,
  deleteSetFromWorkoutExercise,
  addSetToWorkoutExercise,
  updateSetInWorkoutExercise,
} from "../controllers/workoutExercise.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/", addExerciseToWorkout);
router.delete("/:workoutExerciseId", deleteWorkoutExercise);
router.post("/:workoutExerciseId/sets", addSetToWorkoutExercise);
router.delete("/:workoutExerciseId/sets/:setId", deleteSetFromWorkoutExercise);
router.patch("/:workoutExerciseId/sets/:setId", updateSetInWorkoutExercise);

export default router;
