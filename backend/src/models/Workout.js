import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    bodyWeight: { type: Number },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("Workout", workoutSchema);
