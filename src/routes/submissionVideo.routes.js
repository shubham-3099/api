import express from "express";

import {
  createSubmissionVideo,
  getSubmissionVideos,
  getSubmissionVideoById,
  updateSubmissionVideo,
  deleteSubmissionVideo,
} from "../controllers/submissionVideo.controller.js";

import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireVerifiedVlogger } from "../middleware/vlogger.middleware.js";
import { authorizeSubmissionOwnership } from "../middleware/submissionOwnership.js";
import { requirePendingSubmission } from "../middleware/submissionStatus.js";

import {
  createSubmissionVideoSchema,
  updateSubmissionVideoSchema,
} from "../validators/submissionVideo.validator.js";

const router = express.Router();

router.post(
  "/vlogger-submissions/:submissionId/videos",
  authenticate,
  requireVerifiedVlogger,
  authorizeSubmissionOwnership,
  requirePendingSubmission,
  validate(createSubmissionVideoSchema),
  asyncHandler(createSubmissionVideo)
);

router.get(
  "/vlogger-submissions/:submissionId/videos",
  authenticate,
  authorizeSubmissionOwnership,
  asyncHandler(getSubmissionVideos)
);

router.get(
  "/vlogger-submissions/:submissionId/videos/:videoId",
  authenticate,
  authorizeSubmissionOwnership,
  asyncHandler(getSubmissionVideoById)
);

router.patch(
  "/vlogger-submissions/:submissionId/videos/:videoId",
  authenticate,
  requireVerifiedVlogger,
  authorizeSubmissionOwnership,
  requirePendingSubmission,
  validate(updateSubmissionVideoSchema),
  asyncHandler(updateSubmissionVideo)
);

router.delete(
  "/vlogger-submissions/:submissionId/videos/:videoId",
  authenticate,
  requireVerifiedVlogger,
  authorizeSubmissionOwnership,
  requirePendingSubmission,
  asyncHandler(deleteSubmissionVideo)
);

export default router;