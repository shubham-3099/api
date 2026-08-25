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

const router = express.Router();

router.post("/:vloggerId/platforms", validate(createVloggerPlatformSchema), createVloggerPlatform);
router.get("/:vloggerId/platforms", getVloggerPlatforms);
router.get("/:vloggerId/platforms/:platformId", getVloggerPlatformById);
router.patch("/:vloggerId/platforms/:platformId", validate(updateVloggerPlatformSchema), updateVloggerPlatform);
router.delete("/:vloggerId/platforms/:platformId", deleteVloggerPlatform);

export default router;