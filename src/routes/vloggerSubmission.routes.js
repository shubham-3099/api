import express from "express";

import {
  createVloggerSubmission,
  getVloggerSubmissions,
  getVloggerSubmissionById,
  updateVloggerSubmission,
  deleteVloggerSubmission,
  approveVloggerSubmission,
  rejectVloggerSubmission,
} from "../controllers/vloggerSubmission.controller.js";

const router = express.Router();

router.post("/", createVloggerSubmission);

router.get("/", getVloggerSubmissions);

router.get("/:submissionId", getVloggerSubmissionById);

router.patch("/:submissionId", updateVloggerSubmission);

router.delete("/:submissionId", deleteVloggerSubmission);

router.patch("/:submissionId/approve", approveVloggerSubmission);

router.patch("/:submissionId/reject", rejectVloggerSubmission);

export default router;