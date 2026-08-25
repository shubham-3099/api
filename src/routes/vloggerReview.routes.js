import express from "express";

import {
  createVloggerReview,
  getVloggerReviews,
  getVloggerReviewById,
  updateVloggerReview,
  deleteVloggerReview,
} from "../controllers/vloggerReview.controller.js";

import { asyncHandler } from "../middleware/asyncHandler.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireVerifiedVlogger } from "../middleware/vlogger.middleware.js";
import { authorizeVloggerReviewOwnership } from "../middleware/vloggerReviewOwnership.js";
import { validate } from "../middleware/validate.js";

import { createVloggerReviewSchema } from "../validators/vloggerReview.validator.js";

const router = express.Router();
router.post(
  "/:restaurantId/dishes/:dishId/vlogger-reviews",
  authenticate,
  requireVerifiedVlogger,
  validate(createVloggerReviewSchema),
  asyncHandler(createVloggerReview)
);
router.get("/:restaurantId/dishes/:dishId/vlogger-reviews", asyncHandler(getVloggerReviews));
router.get("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId", asyncHandler(getVloggerReviewById));
router.patch(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId",
  authenticate,
  requireVerifiedVlogger,
  authorizeVloggerReviewOwnership,
  validate(updateVloggerReviewSchema),
  asyncHandler(updateVloggerReview)
);
router.delete(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId",
  authenticate,
  requireVerifiedVlogger,
  authorizeVloggerReviewOwnership,
  asyncHandler(deleteVloggerReview)
);

export default router;