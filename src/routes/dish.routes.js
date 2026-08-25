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

const router = express.Router();

router.post("/:restaurantId/dishes", validate(createDishSchema), createDish);
router.get("/:restaurantId/dishes", getDishes);
router.get("/:restaurantId/dishes/:dishId", getDishById);
router.patch("/:restaurantId/dishes/:dishId", validate(updateDishSchema), updateDish);
router.delete("/:restaurantId/dishes/:dishId", deleteDish);

export default router;