import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/index.js";

const errorHandlerMiddleware = (err, req, res, _next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.name === "CastError") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `Invalid ${err.path}: expected ${err.kind}` });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ msg: messages.join(", ") });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.errorResponse.keyValue)[0];

    if (field === "username" || field === "email") {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: "User already exists" });
    }

    return res
      .status(StatusCodes.CONFLICT)
      .json({ msg: `${field} already exists` });
  }

  // 2. Setup Default Error
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
export default errorHandlerMiddleware;
