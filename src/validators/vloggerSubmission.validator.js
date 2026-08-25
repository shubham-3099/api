import { z } from "zod";

export const createVloggerSubmissionSchema = z.object({
  platformId: z.number().int().positive(),

  restaurantName: z
    .string()
    .trim()
    .min(1, "Restaurant name is required")
    .max(150, "Restaurant name is too long"),

  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(300, "Address is too long"),

  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(100, "City is too long"),

  dishName: z
    .string()
    .trim()
    .min(1, "Dish name is required")
    .max(100, "Dish name is too long"),

  title: z
    .string()
    .trim()
    .max(200, "Title is too long")
    .optional(),

  thumbnailUrl: z
    .string()
    .trim()
    .url("Thumbnail URL must be a valid URL")
    .optional(),
});

export const updateVloggerSubmissionSchema = z.object({
  platformId: z.number().int().positive().optional(),

  restaurantName: z
    .string()
    .trim()
    .min(1, "Restaurant name cannot be empty")
    .max(150, "Restaurant name is too long")
    .optional(),

  address: z
    .string()
    .trim()
    .min(1, "Address cannot be empty")
    .max(300, "Address is too long")
    .optional(),

  city: z
    .string()
    .trim()
    .min(1, "City cannot be empty")
    .max(100, "City is too long")
    .optional(),

  dishName: z
    .string()
    .trim()
    .min(1, "Dish name cannot be empty")
    .max(100, "Dish name is too long")
    .optional(),

  title: z
    .string()
    .trim()
    .max(200, "Title is too long")
    .optional(),

  thumbnailUrl: z
    .string()
    .trim()
    .url("Thumbnail URL must be a valid URL")
    .optional(),
});