import express from "express";

import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller.js";

import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(createRestaurant));
router.get("/", asyncHandler(getRestaurants));
router.get("/:id", asyncHandler(getRestaurantById));
router.patch("/:id", asyncHandler(updateRestaurant));
router.delete("/:id", asyncHandler(deleteRestaurant));

export default router;