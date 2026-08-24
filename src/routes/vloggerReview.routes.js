import express from "express";

import {
  createVloggerReview,
  getVloggerReviews,
  getVloggerReviewById,
  updateVloggerReview,
  deleteVloggerReview,
} from "../controllers/vloggerReview.controller.js";

const router = express.Router();

router.post("/:restaurantId/dishes/:dishId/vlogger-reviews", createVloggerReview);

router.get("/:restaurantId/dishes/:dishId/vlogger-reviews", getVloggerReviews);

router.get("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId", getVloggerReviewById);

router.patch("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId", updateVloggerReview);

router.delete("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId", deleteVloggerReview);

export default router;