export const CONDITION = process.env.NODE_ENV;

export const SITE_URL =
  CONDITION === "development"
    ? "http://localhost:3000"
    : "https://mijikai.space";
