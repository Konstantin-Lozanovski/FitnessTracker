import mongoose from "mongoose";

const userExerciseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please provide exercise name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      trim: true,
      enum: [
        "Abs",
        "Back",
        "Biceps",
        "Cardio",
        "Chest",
        "Legs",
        "Shoulders",
        "Triceps",
      ],
    },
    description: {
      type: String,
      trim: true,
    },
    equipment: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("UserExercise", userExerciseSchema);
