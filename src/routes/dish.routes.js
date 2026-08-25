import express from "express";

import {
  createDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish,
} from "../controllers/dish.controller.js";

import { validate } from "../middleware/validate.js";

import {
  createDishSchema,
  updateDishSchema,
} from "../validators/dish.validator.js";

import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/:restaurantId/dishes", validate(createDishSchema), asyncHandler(createDish));
router.get("/:restaurantId/dishes", asyncHandler(getDishes));
router.get("/:restaurantId/dishes/:dishId", asyncHandler(getDishById));
router.patch("/:restaurantId/dishes/:dishId", validate(updateDishSchema), asyncHandler(updateDish));
router.delete("/:restaurantId/dishes/:dishId", asyncHandler(deleteDish));

export default router;