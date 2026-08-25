import express from "express";

import {
  createReview,
  getReviews,
  getReviewById,
  deleteReview,
} from "../controllers/review.controller.js";

import { validate } from "../middleware/validate.js";
import { createReviewSchema } from "../validators/userReview.validator.js";

const router = express.Router();

router.post("/:restaurantId/dishes/:dishId/reviews", validate(createReviewSchema), createReview);
router.get("/:restaurantId/dishes/:dishId/reviews", getReviews);
router.get("/:restaurantId/dishes/:dishId/reviews/:reviewId", getReviewById);
router.delete("/:restaurantId/dishes/:dishId/reviews/:reviewId", deleteReview);

export default router;