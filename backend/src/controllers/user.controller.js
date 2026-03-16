import User from "../models/user.model.js";

// GET /api/users/me
export const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "-password -verificationToken",
  );
  res.status(200).json(user);
};

// PATCH /api/users/me
export const updateMyProfile = async (req, res) => {
  const updates = {};
  if (req.body.goalWeight !== undefined)
    updates.goalWeight = req.body.goalWeight;
  // add other editable fields here if you want (like exerciseGoals later)

  const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  }).select("-password -verificationToken");

  res.status(200).json(updatedUser);
};
