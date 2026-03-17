import Workout from "../models/workout.model.js";
import WorkoutExercise from "../models/workoutExercise.model.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import mongoose from "mongoose";

export const createWorkout = async (req, res) => {
  const userId = req.user.id;

  const now = new Date();
  const startTime = now.toTimeString().slice(0, 5);

  const workout = new Workout({ user: userId, startTime });
  await workout.save();

  res.status(StatusCodes.CREATED).json(workout);
};

export const updateWorkout = async (req, res) => {
  const userId = req.user.id;
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    throw new BadRequestError("Invalid workout ID");
  }

  const allowedUpdates = {};
  if (req.body.endTime !== undefined) allowedUpdates.endTime = req.body.endTime; // user chooses the value
  if (req.body.name !== undefined) allowedUpdates.name = req.body.name;
  if (req.body.bodyWeight !== undefined) {
    allowedUpdates.bodyWeight = req.body.bodyWeight;
  }

  const workout = await Workout.findOneAndUpdate(
    {
      _id: workoutId,
      user: userId,
    },
    allowedUpdates,
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

  await WorkoutExercise.deleteMany({ workout: workoutId, user: userId });

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
    .sort({ order: 1 })
    .populate("exerciseId");

  // -------- NEW PART --------

  // Collect exercise IDs
  const exerciseIds = exercises.map((ex) => ex.exerciseId._id);

  // Fetch previous exercises (excluding this workout)
  const previousExercises = await WorkoutExercise.find({
    user: userId,
    exerciseId: { $in: exerciseIds },
    workout: { $ne: workoutId },
  })
    .populate("workout")
    .sort({ createdAt: -1 })
    .lean();

  // Map latest previous sets per exercise
  const previousMap = {};

  for (const ex of previousExercises) {
    if (new Date(ex.workout.date) >= new Date(workout.date)) continue;

    const id = ex.exerciseId.toString();

    if (!previousMap[id]) {
      previousMap[id] = ex.sets;
    }
  }

  // -------- END NEW PART --------

  // Convert workout to JSON object and attach exercises
  const workoutWithExercises = workout.toObject();

  workoutWithExercises.exercises = exercises.map((ex) => ({
    _id: ex._id,
    exerciseId: ex.exerciseId,
    order: ex.order,
    sets: ex.sets,
    previousSets: previousMap[ex.exerciseId._id.toString()] || [], // <-- added
  }));

  res.status(StatusCodes.OK).json(workoutWithExercises);
};

export const getAllWorkouts = async (req, res) => {
  const userId = req.user.id;
  const workouts = await Workout.find({ user: userId }).sort({ date: -1 });
  res.status(StatusCodes.OK).json(workouts);
};
