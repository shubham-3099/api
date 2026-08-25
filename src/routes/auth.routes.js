import express from "express";

import {
  registerUser,
  login,
} from "../controllers/auth.controller.js";

import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

import {
  registerUserSchema,
  loginSchema,
} from "../validators/auth.validator.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerUserSchema),
  asyncHandler(registerUser)
);

router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(login)
);

export default router;