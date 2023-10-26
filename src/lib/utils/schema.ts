import { z } from "zod";

export const withoutCustomSlugSchema = z.object({
  original_url: z
    .string()
    .min(1, {
      message: "Please input more than one character!",
    })
    .regex(/^https\:\/\/.*$/, {
      message: "Only link with https:// prefix are allowed!",
    })
    .regex(/^[\w:%-?=\./]+$/gi, {
      message: "Please input only alphabet or number!",
    }),
});

export const withCustomSlugSchema = withoutCustomSlugSchema.extend({
  custom_slug: z
    .string()
    .min(1, {
      message: "Please input more than one character!",
    })
    .regex(/^[\w-]+$/gi, {
      message: "Please input only alphabet or number!",
    }),
});
