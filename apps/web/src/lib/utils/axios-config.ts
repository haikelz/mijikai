import { ShortenedUrlProps } from "@types";
import Axios, { AxiosRequestConfig } from "axios";
import { env } from "~env.mjs";

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
type PostDataProps = {
  url: string;
  custom_slug: string;
  is_custom_slug: boolean;
};

export async function postData(
  { url, custom_slug, is_custom_slug }: PostDataProps
): Promise<{ data: ShortenedUrlProps }> {
  const response = await axios.post(
    "/api/url-shortener",
    { url: url, custom_slug: custom_slug, is_custom_slug: is_custom_slug },
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
