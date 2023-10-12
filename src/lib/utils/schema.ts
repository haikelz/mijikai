import { z } from "zod";

export const inputSchema = z.object({
  original_url: z
    .string()
    .min(1, { message: "Please input more than one character" })
    .regex(/[\w]/gi, {
      message: "Please input only alphabet or number!",
    }),
});
