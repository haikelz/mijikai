import Axios, { AxiosRequestConfig } from "axios";
import { env } from "~env.mjs";
import { ShortenedUrlProps } from "~types";

const { NEXT_PUBLIC_DEVELOPMENT_URL, NEXT_PUBLIC_PRODUCTION_URL } = env;

const condition = process.env.NODE_ENV;

// axios base config
const config: AxiosRequestConfig = {
  responseType: "json",
  baseURL:
    condition === "development"
      ? NEXT_PUBLIC_DEVELOPMENT_URL
      : NEXT_PUBLIC_PRODUCTION_URL,
  headers: {
    "content-type": "application/json",
  },
};

const axios = Axios.create(config);

// post
export async function postData(
  url: string
): Promise<{ data: ShortenedUrlProps }> {
  const response = await axios.post(
    "/api/url-shortener",
    { url: url },
    {
      method: "POST",
    }
  );

  return response.data;
}

// delete
export async function deleteData(id: number): Promise<void> {
  await axios.delete("/api/url-shortener", {
    method: "DELETE",
    data: { id: id },
  });
}
