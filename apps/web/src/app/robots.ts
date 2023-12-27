import { MetadataRoute } from "next";
import { env } from "~env.mjs";

const { NEXT_PUBLIC_PRODUCTION_URL } = env;

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: NEXT_PUBLIC_PRODUCTION_URL,
  };
}
