import express from "express";

import {
  createVloggerPlatform,
  getVloggerPlatforms,
  getVloggerPlatformById,
  updateVloggerPlatform,
  deleteVloggerPlatform,
} from "../controllers/vlogger-platform.controller.js";

const router = express.Router();

router.post("/:vloggerId/platforms", createVloggerPlatform);
router.get("/:vloggerId/platforms", getVloggerPlatforms);
router.get("/:vloggerId/platforms/:platformId", getVloggerPlatformById);
router.patch("/:vloggerId/platforms/:platformId", updateVloggerPlatform);
router.delete("/:vloggerId/platforms/:platformId", deleteVloggerPlatform);

export default router;