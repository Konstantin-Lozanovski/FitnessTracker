import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
  let { username, password, email } = req.body;

  if (!username || !password || !email)
    throw new BadRequestError("Please provide all fields");

  const user = new User({ username, password, email });
  await user.save();

  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username, email: user.email }, token });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new BadRequestError("Please provide username and password");

  const user = await User.findOne({ username });
  if (!user) throw new UnauthenticatedError("Invalid credentials");

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { username: user.username, email: user.email }, token });
};
