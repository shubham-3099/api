import express from "express";

import {
  createVloggerReviewVideo,
  getVloggerReviewVideos,
  getVloggerReviewVideoById,
  updateVloggerReviewVideo,
  deleteVloggerReviewVideo,
} from "../controllers/vloggerReviewVideo.controller.js";

import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos", asyncHandler(createVloggerReviewVideo));
router.get("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos", asyncHandler(getVloggerReviewVideos));
router.get("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos/:videoId", asyncHandler(getVloggerReviewVideoById));
router.patch("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos/:videoId", asyncHandler(updateVloggerReviewVideo));
router.delete("/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos/:videoId", asyncHandler(deleteVloggerReviewVideo));

export default router;