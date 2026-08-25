import express from "express";

import {
  createSubmissionVideo,
  getSubmissionVideos,
  getSubmissionVideoById,
  updateSubmissionVideo,
  deleteSubmissionVideo,
} from "../controllers/submissionVideo.controller.js";

const router = express.Router();

router.post("/vlogger-submissions/:submissionId/videos", createSubmissionVideo);
router.get("/vlogger-submissions/:submissionId/videos", getSubmissionVideos);
router.get("/vlogger-submissions/:submissionId/videos/:videoId", getSubmissionVideoById);
router.patch("/vlogger-submissions/:submissionId/videos/:videoId", updateSubmissionVideo);
router.delete("/vlogger-submissions/:submissionId/videos/:videoId", deleteSubmissionVideo);

export default router;