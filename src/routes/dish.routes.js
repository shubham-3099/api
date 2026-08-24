import express from "express";

import {
  createDish,
  getDishes,
  getDishById,
  updateDish,
  deleteDish,
} from "../controllers/dish.controller.js";

const router = express.Router();

router.post("/:restaurantId/dishes", createDish);
router.get("/:restaurantId/dishes", getDishes);
router.get("/:restaurantId/dishes/:dishId", getDishById);
router.patch("/:restaurantId/dishes/:dishId", updateDish);
router.delete("/:restaurantId/dishes/:dishId", deleteDish);

export default router;