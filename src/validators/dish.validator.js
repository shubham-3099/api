import { z } from "zod";

export const createDishSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Dish name is required")
    .max(100, "Dish name is too long"),
});

export const updateDishSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Dish name cannot be empty")
    .max(100, "Dish name is too long")
    .optional(),
});