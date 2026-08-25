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
import { authorizeUserOwnership } from "../middleware/ownership.js";

const router = express.Router();

router.get("/", authenticate, authorize("ADMIN"), asyncHandler(getUsers));
router.get("/:id", authenticate, authorizeUserOwnership, asyncHandler(getUserById));
router.patch("/:id", authenticate, authorizeUserOwnership, asyncHandler(updateUser));
router.delete("/:id", authenticate, authorizeUserOwnership, asyncHandler(deleteUser));

export default router;