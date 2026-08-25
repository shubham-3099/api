import { z } from "zod";

export const createVloggerReviewSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty")
    .optional(),

  thumbnailUrl: z
    .string()
    .trim()
    .url("Thumbnail URL must be a valid URL")
    .optional(),
});

export const updateVloggerReviewSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty")
    .optional(),

  thumbnailUrl: z
    .string()
    .trim()
    .url("Thumbnail URL must be a valid URL")
    .optional(),
});