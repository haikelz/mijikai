import { env } from "~env.mjs";

export const CONDITION = process.env.NODE_ENV;

const { NEXT_PUBLIC_PRODUCTION_URL } = env;

export const SITE_URL =
  CONDITION === "development"
    ? "http://localhost:3000"
    : NEXT_PUBLIC_PRODUCTION_URL;
