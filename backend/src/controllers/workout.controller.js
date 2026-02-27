import Workout from "../models/workout.model.js";
import WorkoutExercise from "../models/workoutExercise.model.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import mongoose from "mongoose";

export const createWorkout = async (req, res) => {
  const userId = req.user.id;

  const workout = new Workout({ user: userId });
  await workout.save();

  res.status(StatusCodes.CREATED).json(workout);
};

export const updateWorkout = async (req, res) => {
  const userId = req.user.id;
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    throw new BadRequestError("Invalid workout ID");
  }

  const workout = await Workout.findOneAndUpdate(
    {
      _id: workoutId,
      user: userId,
    },
    req.body,
    { returnDocument: "after", runValidators: true },
  );

  if (!workout) {
    throw new NotFoundError("Workout not found");
  }

  res.status(StatusCodes.OK).json(workout);
};

export const deleteWorkout = async (req, res) => {
  const userId = req.user.id;
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    throw new BadRequestError("Invalid workout ID");
  }

  const workout = await Workout.findOneAndDelete({
    _id: workoutId,
    user: userId,
  });

  if (!workout) {
    throw new NotFoundError("Workout not found");
  }

  res.status(StatusCodes.NO_CONTENT).send();
};

export const getWorkoutById = async (req, res) => {
  const userId = req.user.id;
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    throw new BadRequestError("Invalid workout ID");
  }

  const workout = await Workout.findOne({ _id: workoutId, user: userId });

  if (!workout) {
    throw new NotFoundError("Workout not found");
  }

  // Fetch exercises for this workout
  const exercises = await WorkoutExercise.find({
    workout: workoutId,
    user: userId,
  })
    .sort({ order: 1 }) // optional: keep exercises in the order field
    .populate("exerciseId");

  // Convert workout to JSON object and attach exercises
  const workoutWithExercises = workout.toObject();
  workoutWithExercises.exercises = exercises.map((ex) => ({
    _id: ex._id,
    exerciseId: ex.exerciseId, // populated exercise
    order: ex.order,
    sets: ex.sets,
  }));

  res.status(StatusCodes.OK).json(workoutWithExercises);
};

export const getAllWorkouts = async (req, res) => {
  const userId = req.user.id;
  const workouts = await Workout.find({ user: userId }).sort({ date: -1 });
  res.status(StatusCodes.OK).json(workouts);
};
