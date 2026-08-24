import express from "express";

import {
  createVlogger,
  getVloggers,
  getVloggerById,
  updateVlogger,
  deleteVlogger,
} from "../controllers/vlogger.controller.js";

const router = express.Router();

router.post("/", createVlogger);
router.get("/", getVloggers);
router.get("/:id", getVloggerById);
router.patch("/:id", updateVlogger);
router.delete("/:id", deleteVlogger);

export default router;