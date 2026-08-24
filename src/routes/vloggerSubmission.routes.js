import express from "express";

import {
  createVloggerSubmission,
  getVloggerSubmissions,
  getVloggerSubmissionById,
  updateVloggerSubmission,
  deleteVloggerSubmission,
} from "../controllers/vloggerSubmission.controller.js";

const router = express.Router();

router.post("/", createVloggerSubmission);

router.get("/", getVloggerSubmissions);

router.get("/:submissionId", getVloggerSubmissionById);

router.patch("/:submissionId", updateVloggerSubmission);

router.delete("/:submissionId", deleteVloggerSubmission);

export default router;