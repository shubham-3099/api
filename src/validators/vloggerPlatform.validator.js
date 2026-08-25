import { z } from "zod";

const platformEnum = z.enum([
  "YOUTUBE",
  "INSTAGRAM",
  "FACEBOOK",
  "TIKTOK",
  "OTHER",
]);

export const createVloggerPlatformSchema = z.object({
  platform: platformEnum,
  profileUrl: z
    .string()
    .trim()
    .url("Profile URL must be a valid URL"),
});

export const updateVloggerPlatformSchema = z.object({
  platform: platformEnum.optional(),
  profileUrl: z
    .string()
    .trim()
    .url("Profile URL must be a valid URL")
    .optional(),
});