import Exercise from "../models/exercise.model.js";
import { BadRequestError } from "../errors/index.js";

export const getAllExercises = async (req, res) => {
  const exercises = await Exercise.find();

  res.status(200).json(exercises);
};

export const createExercise = async (req, res) => {
  const { name, category } = req.body;

  if (!name || !category) {
    throw new BadRequestError("Please provide name and category");
  }

  const exercise = new Exercise({ name, category });
  await exercise.save();

  res.status(201).json(exercise);
};

export const updateExercise = async (req, res) => {};
export const deleteExercise = async (req, res) => {};
