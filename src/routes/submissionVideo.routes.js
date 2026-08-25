import express from "express";

import {
  createSubmissionVideo,
  getSubmissionVideos,
  getSubmissionVideoById,
  updateSubmissionVideo,
  deleteSubmissionVideo,
} from "../controllers/submissionVideo.controller.js";

import { validate } from "../middleware/validate.js";

import {
  createSubmissionVideoSchema,
  updateSubmissionVideoSchema,
} from "../validators/submissionVideo.validator.js";

const router = express.Router();

router.post("/vlogger-submissions/:submissionId/videos", validate(createSubmissionVideoSchema), createSubmissionVideo);
router.get("/vlogger-submissions/:submissionId/videos", getSubmissionVideos);
router.get("/vlogger-submissions/:submissionId/videos/:videoId", getSubmissionVideoById);
router.patch("/vlogger-submissions/:submissionId/videos/:videoId", validate(updateSubmissionVideoSchema), updateSubmissionVideo);
router.delete("/vlogger-submissions/:submissionId/videos/:videoId", deleteSubmissionVideo);

export default router;