import express from "express";

import {
  registerUser,
  registerVlogger,
  login,
} from "../controllers/auth.controller.js";

import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

import {
  registerUserSchema,
  registerVloggerSchema,
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

router.post(
  "/register/vlogger",
  validate(registerVloggerSchema),
  asyncHandler(registerVlogger)
);

export default router;