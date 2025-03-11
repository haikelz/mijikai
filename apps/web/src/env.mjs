import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXT_PUBLIC_GITHUB_ID: z.string().min(1),
    NEXT_PUBLIC_GITHUB_SECRET: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_ID: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_SECRET: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url().min(1),
  },
  client: {
    NEXT_PUBLIC_DEVELOPMENT_URL: z.string().url().min(1),
    NEXT_PUBLIC_PRODUCTION_URL: z.string().url().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().min(1),
    NEXT_PUBLIC_SUPABASE_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_DEVELOPMENT_URL: process.env.NEXT_PUBLIC_DEVELOPMENT_URL,
    NEXT_PUBLIC_PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
});
