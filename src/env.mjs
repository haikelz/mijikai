import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXT_PUBLIC_DEVELOPMENT_URL: z.string().url().min(1),
    NEXT_PUBLIC_PRODUCTION_URL: z.string().url().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().min(1),
    NEXT_PUBLIC_SUPABASE_KEY: z.string().min(1),
  },
});
