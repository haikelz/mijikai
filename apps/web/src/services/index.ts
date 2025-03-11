import { ShortenedUrlProps } from "@types";
import { axiosClient } from "~lib/utils/axios-config";

// post
type PostDataProps = {
  url: string;
  custom_slug: string;
  is_custom_slug: boolean;
};

export async function createNewUrl({
  url,
  custom_slug,
  is_custom_slug,
}: PostDataProps): Promise<{ data: ShortenedUrlProps }> {
  const response = await axiosClient.post(
    "/api/url-shortener",
    { url: url, custom_slug: custom_slug, is_custom_slug: is_custom_slug },
    {
      method: "POST",
    }
  );

  return response.data;
}

// delete
export async function deleteUrl(id: number): Promise<void> {
  await axiosClient.delete("/api/url-shortener", {
    method: "DELETE",
    data: { id: id },
  });
}
