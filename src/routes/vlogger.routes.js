import express from "express";

import {
  createVlogger,
  getVloggers,
  getVloggerById,
  updateVlogger,
  deleteVlogger,
} from "../controllers/vlogger.controller.js";

import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(createVlogger));
router.get("/", asyncHandler(getVloggers));
router.get("/:id", asyncHandler(getVloggerById));
router.patch("/:id", asyncHandler(updateVlogger));
router.delete("/:id", asyncHandler(deleteVlogger));

export default router;