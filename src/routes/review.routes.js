import express from "express";

import {
  createReview,
  getReviews,
  getReviewById,
  deleteReview,
} from "../controllers/review.controller.js";

import { validate } from "../middleware/validate.js";
import { createReviewSchema } from "../validators/userReview.validator.js";

import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/:restaurantId/dishes/:dishId/reviews", validate(createReviewSchema), asyncHandler(createReview));
router.get("/:restaurantId/dishes/:dishId/reviews", asyncHandler(getReviews));
router.get("/:restaurantId/dishes/:dishId/reviews/:reviewId", asyncHandler(getReviewById));
router.delete("/:restaurantId/dishes/:dishId/reviews/:reviewId", asyncHandler(deleteReview));

export default router;