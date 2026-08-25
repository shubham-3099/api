import { z } from "zod";

export const createReviewSchema = z.object({
  userId: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});