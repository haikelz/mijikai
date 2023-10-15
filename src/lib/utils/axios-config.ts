import Axios from "axios";
import { env } from "~env.mjs";

const { NEXT_PUBLIC_DEVELOPMENT_URL, NEXT_PUBLIC_PRODUCTION_URL } = env;

const condition = process.env.NODE_ENV;

// base
const axios = Axios.create({
  responseType: "json",
  baseURL:
    condition === "development"
      ? NEXT_PUBLIC_DEVELOPMENT_URL
      : NEXT_PUBLIC_PRODUCTION_URL,
  headers: {
    "content-type": "application/json",
  },
});

// post
export async function postData(url: string) {
  const response = await axios.post(
    "/api/url-shortener",
    { url: url },
    {
      method: "POST",
    }
  );

  return response.data;
}

// get
export async function getData(url: string) {
  const response = await axios.get(url, { method: "GET" });
  return response.data;
}

// delete
export async function deleteData(id: number) {
  await axios.delete("/api/url-shortener", {
    method: "DELETE",
    data: { id: id },
  });
}
