const condition = process.env.NODE_ENV;

export const SITE_URL =
  condition === "development"
    ? "http://localhost:3000"
    : "https://mijikai.space";

export const DEFAULT_OG_URL = "/images/og.png";
