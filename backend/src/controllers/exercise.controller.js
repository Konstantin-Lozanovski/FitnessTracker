import Exercise from "../models/exercise.model.js";

export const getAllExercises = async (req, res) => {
  const exercises = await Exercise.find();

  res.status(200).json(exercises);
};

export const createExercise = async (req, res) => {
  const { name, category } = req.body;

  const exercise = new Exercise({ name, category });
  await exercise.save();

  res.status(201).json(exercise);
};

export const updateExercise = async (req, res) => {};
export const deleteExercise = async (req, res) => {};
