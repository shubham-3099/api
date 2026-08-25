import express from "express";

import {
  createVloggerReview,
  getVloggerReviews,
  getVloggerReviewById,
  updateVloggerReview,
  deleteVloggerReview,
} from "../controllers/vloggerReview.controller.js";

import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/:restaurantId/dishes/:dishId/vlogger-reviews", asyncHandler(createVloggerReview));
router.get("/:restaurantId/dishes/:dishId/vlogger-reviews", asyncHandler(getVloggerReviews));
router.get("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId", asyncHandler(getVloggerReviewById));
router.patch("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId", asyncHandler(updateVloggerReview));
router.delete("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId", asyncHandler(deleteVloggerReview));

export default router;