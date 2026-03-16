import express from "express";

const router = express.Router();

import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/user.controller.js";

router.get("/me", getMyProfile);
router.patch("/me", updateMyProfile);

export default router;
