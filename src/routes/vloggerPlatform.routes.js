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

const router = express.Router();

router.post("/:vloggerId/platforms", validate(createVloggerPlatformSchema), asyncHandler(createVloggerPlatform));
router.get("/:vloggerId/platforms", asyncHandler(getVloggerPlatforms));
router.get("/:vloggerId/platforms/:platformId", asyncHandler(getVloggerPlatformById));
router.patch("/:vloggerId/platforms/:platformId", validate(updateVloggerPlatformSchema), asyncHandler(updateVloggerPlatform));
router.delete("/:vloggerId/platforms/:platformId", asyncHandler(deleteVloggerPlatform));

export default router;