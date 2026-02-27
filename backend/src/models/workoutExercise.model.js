import mongoose from "mongoose";

const setSchema = new mongoose.Schema(
  {
    reps: { type: Number },
    weight: { type: Number },
    notes: { type: String, maxlength: 255 },
  },
  { timestamps: true },
);

const workoutExerciseSchema = new mongoose.Schema(
  {
    workout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
      required: [true, "Please provide workout ID"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user ID"],
    },
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide exercise ID"],
      refPath: "exerciseModel",
    },
    exerciseModel: {
      type: String,
      required: [true, "Please provide exercise model"],
      enum: ["Exercise", "UserExercise"],
    },
    order: { type: Number }, // optional, for ordering exercises in workout
    sets: [setSchema],
  },
  { timestamps: true },
);

export default mongoose.model("WorkoutExercise", workoutExerciseSchema);
