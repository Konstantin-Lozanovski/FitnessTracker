import mongoose from "mongoose";
import WorkoutExercise from "../models/workoutExercise.model.js";
import Workout from "../models/workout.model.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

/* ============================
   Create a WorkoutExercise
   POST /api/workouts/:workoutId/exercises
============================ */
export const addExerciseToWorkout = async (req, res) => {
  const userId = req.user.id;
  const { workoutId } = req.params;
  const { exerciseId, exerciseModel, order } = req.body;

  if (!mongoose.Types.ObjectId.isValid(workoutId))
    throw new BadRequestError("Invalid workout ID");
  if (!mongoose.Types.ObjectId.isValid(exerciseId))
    throw new BadRequestError("Invalid exercise ID");

  const workout = await Workout.findOne({ _id: workoutId, user: userId });
  if (!workout) throw new NotFoundError("Workout not found");

  const workoutExercise = await WorkoutExercise.create({
    workout: workoutId,
    user: userId,
    exerciseId,
    exerciseModel,
    order,
    sets: [{ weight: 0, reps: 0, notes: "" }],
  });

  res.status(StatusCodes.CREATED).json(workoutExercise);
};
/* ============================
   Add set to workout exercise
   POST /api/workouts/:workoutId/exercises/:workoutExerciseId/sets
============================ */
export const addSetToWorkoutExercise = async (req, res) => {
  const userId = req.user.id;
  const { workoutId, workoutExerciseId } = req.params;

  const set = { weight: 0, reps: 0, notes: "" };

  if (!mongoose.Types.ObjectId.isValid(workoutId))
    throw new BadRequestError("Invalid workout ID");
  if (!mongoose.Types.ObjectId.isValid(workoutExerciseId))
    throw new BadRequestError("Invalid exercise ID");

  const exercise = await WorkoutExercise.findOneAndUpdate(
    { _id: workoutExerciseId, workout: workoutId, user: userId },
    { $push: { sets: set } },
    { returnDocument: "after", runValidators: true },
  );

  if (!exercise) throw new NotFoundError("Exercise not found");

  const newSet = exercise.sets[exercise.sets.length - 1];

  res.status(StatusCodes.OK).json(newSet);
};
/* ============================
   Update a set in a workout exercise
   PATCH /api/workouts/:workoutId/exercises/:workoutExerciseId/set/:setId
============================ */
export const updateSetInWorkoutExercise = async (req, res) => {
  const userId = req.user.id;
  const { workoutId, workoutExerciseId, setId } = req.params;
  const { reps, weight, notes } = req.body;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    throw new BadRequestError("Invalid workout ID");
  }
  if (!mongoose.Types.ObjectId.isValid(workoutExerciseId)) {
    throw new BadRequestError("Invalid exercise ID");
  }
  if (!mongoose.Types.ObjectId.isValid(setId)) {
    throw new BadRequestError("Invalid set ID");
  }

  // Only update fields that are defined
  const updateFields = {};
  if (reps !== undefined) updateFields["sets.$.reps"] = reps;
  if (weight !== undefined) updateFields["sets.$.weight"] = weight;
  if (notes !== undefined) updateFields["sets.$.notes"] = notes;

  const exercise = await WorkoutExercise.findOneAndUpdate(
    {
      _id: workoutExerciseId,
      workout: workoutId,
      user: userId,
      "sets._id": setId,
    }, // match the set by _id
    { $set: updateFields },
    { returnDocument: "after", runValidators: true },
  );

  if (!exercise) throw new NotFoundError("Exercise not found");

  const updatedSet = exercise.sets.find((s) => s._id.toString() === setId);

  res.status(StatusCodes.OK).json(updatedSet);
};

/* ============================
   Delete a set from a workout exercise
   DELETE /api/workouts/:workoutId/exercises/:workoutExerciseId/set/:setId
============================ */
export const deleteSetFromWorkoutExercise = async (req, res) => {
  const userId = req.user.id;
  const { workoutId, workoutExerciseId, setId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId))
    throw new BadRequestError("Invalid workout ID");

  if (!mongoose.Types.ObjectId.isValid(workoutExerciseId))
    throw new BadRequestError("Invalid exercise ID");

  if (!mongoose.Types.ObjectId.isValid(setId))
    throw new BadRequestError("Invalid set ID");

  const exercise = await WorkoutExercise.findOneAndUpdate(
    { _id: workoutExerciseId, workout: workoutId, user: userId },
    { $pull: { sets: { _id: setId } } },
    { returnDocument: "after" },
  );

  if (!exercise) throw new NotFoundError("Exercise not found");

  res.status(StatusCodes.NO_CONTENT).send();
};

/* ============================
   Delete a workout exercise
   DELETE /api/workouts/:workoutId/exercises/:workoutExerciseId
============================ */
export const deleteWorkoutExercise = async (req, res) => {
  const userId = req.user.id;
  const { workoutId, workoutExerciseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId))
    throw new BadRequestError("Invalid workout ID");
  if (!mongoose.Types.ObjectId.isValid(workoutExerciseId))
    throw new BadRequestError("Invalid exercise ID");

  const exercise = await WorkoutExercise.findOneAndDelete({
    _id: workoutExerciseId,
    workout: workoutId,
    user: userId,
  });

  if (!exercise) throw new NotFoundError("Exercise not found");

  res.status(StatusCodes.NO_CONTENT).send();
};
