import express from "express";

import {
  createVloggerPlatform,
  getVloggerPlatforms,
  getVloggerPlatformById,
  updateVloggerPlatform,
  deleteVloggerPlatform,
} from "../controllers/vloggerPlatform.controller.js";

import { validate } from "../middleware/validate.js";

import {
  createVloggerPlatformSchema,
  updateVloggerPlatformSchema,
} from "../validators/vloggerPlatform.validator.js";

import { asyncHandler } from "../middleware/asyncHandler.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireVerifiedVlogger } from "../middleware/vlogger.middleware.js";
import { authorizeVloggerOwnership } from "../middleware/vloggerOwnership.js";

const router = express.Router();

router.post(
  "/:vloggerId/platforms",
  authenticate,
  requireVerifiedVlogger,
  authorizeVloggerOwnership,
  validate(createVloggerPlatformSchema),
  asyncHandler(createVloggerPlatform
));
router.get(
  "/:vloggerId/platforms",
  authenticate,
  requireVerifiedVlogger,
  authorizeVloggerOwnership,
  asyncHandler(getVloggerPlatforms)
);
router.get(
  "/:vloggerId/platforms/:platformId",
  authenticate,
  requireVerifiedVlogger,
  authorizeVloggerOwnership,
  asyncHandler(getVloggerPlatformById)
);
router.patch(
  "/:vloggerId/platforms/:platformId",
  authenticate,
  requireVerifiedVlogger,
  authorizeVloggerOwnership,
  validate(updateVloggerPlatformSchema),
  asyncHandler(updateVloggerPlatform)
);
router.delete(
  "/:vloggerId/platforms/:platformId",
  authenticate,
  requireVerifiedVlogger,
  authorizeVloggerOwnership,
  asyncHandler(deleteVloggerPlatform)
);

export default router;