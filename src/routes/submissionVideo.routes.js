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

import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/vlogger-submissions/:submissionId/videos", validate(createSubmissionVideoSchema), asyncHandler(createSubmissionVideo));
router.get("/vlogger-submissions/:submissionId/videos", asyncHandler(getSubmissionVideos));
router.get("/vlogger-submissions/:submissionId/videos/:videoId", asyncHandler(getSubmissionVideoById));
router.patch("/vlogger-submissions/:submissionId/videos/:videoId", validate(updateSubmissionVideoSchema), asyncHandler(updateSubmissionVideo));
router.delete("/vlogger-submissions/:submissionId/videos/:videoId", asyncHandler(deleteSubmissionVideo));

export default router;