import express from "express";

import {
  createVloggerReviewVideo,
  getVloggerReviewVideos,
  getVloggerReviewVideoById,
  updateVloggerReviewVideo,
  deleteVloggerReviewVideo,
} from "../controllers/vloggerReviewVideo.controller.js";

const router = express.Router();

router.post(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos",
  createVloggerReviewVideo
);

router.get(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos",
  getVloggerReviewVideos
);

router.get(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos/:videoId",
  getVloggerReviewVideoById
);

router.patch(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos/:videoId",
  updateVloggerReviewVideo
);

router.delete(
  "/:restaurantId/dishes/:dishId/vlogger-reviews/:reviewId/videos/:videoId",
  deleteVloggerReviewVideo
);

export default router;