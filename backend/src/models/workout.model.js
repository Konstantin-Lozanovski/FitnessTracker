import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user ID"],
    },
    name: { type: String, trim: true, default: "New Workout" },
    date: { type: Date, default: Date.now },
    bodyWeight: { type: Number },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("Workout", workoutSchema);
