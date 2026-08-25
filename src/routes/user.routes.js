import express from "express";

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { asyncHandler } from "../middleware/asyncHandler.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = express.Router();

router.get("/", authenticate, authorize("ADMIN"), asyncHandler(getUsers));
router.get("/:id", authenticate, asyncHandler(getUserById));
router.patch("/:id", authenticate, asyncHandler(updateUser));
router.delete("/:id", authenticate, asyncHandler(deleteUser));

export default router;