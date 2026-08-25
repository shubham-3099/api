import { z } from "zod";

const platformEnum = z.enum([
  "YOUTUBE",
  "INSTAGRAM",
  "FACEBOOK",
  "TIKTOK",
  "OTHER",
]);

export const createVloggerReviewVideoSchema = z.object({
  platform: platformEnum,

  videoUrl: z
    .string()
    .trim()
    .url("Video URL must be a valid URL"),
});

export const updateVloggerReviewVideoSchema = z.object({
  platform: platformEnum.optional(),

  videoUrl: z
    .string()
    .trim()
    .url("Video URL must be a valid URL")
    .optional(),
});