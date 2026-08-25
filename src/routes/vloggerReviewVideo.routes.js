import express from "express";

import {
  createVloggerReviewVideo,
  getVloggerReviewVideos,
  getVloggerReviewVideoById,
  updateVloggerReviewVideo,
  deleteVloggerReviewVideo,
} from "../controllers/vloggerReviewVideo.controller.js";

import { asyncHandler } from "../middleware/asyncHandler.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireVerifiedVlogger } from "../middleware/vlogger.middleware.js";
import { authorizeVloggerReviewOwnership } from "../middleware/vloggerReviewOwnership.js";
import { validate } from "../middleware/validate.js";

import {
  createVloggerReviewVideoSchema,
  updateVloggerReviewVideoSchema,
} from "../validators/vloggerReviewVideo.validator.js";

const router = express.Router();

router.post(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos",
  authenticate,
  requireVerifiedVlogger,
  authorizeVloggerReviewOwnership,
  validate(createVloggerReviewVideoSchema),
  asyncHandler(createVloggerReviewVideo)
);

router.get(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos",
  asyncHandler(getVloggerReviewVideos)
);

router.get(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos/:videoId",
  asyncHandler(getVloggerReviewVideoById)
);

router.patch(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos/:videoId",
  authenticate,
  requireVerifiedVlogger,
  authorizeVloggerReviewOwnership,
  validate(updateVloggerReviewVideoSchema),
  asyncHandler(updateVloggerReviewVideo)
);

router.delete(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos/:videoId",
  authenticate,
  requireVerifiedVlogger,
  authorizeVloggerReviewOwnership,
  asyncHandler(deleteVloggerReviewVideo)
);

export default router;