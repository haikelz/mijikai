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
    { url, custom_slug: custom_slug, is_custom_slug: is_custom_slug },
    {
      method: "POST",
    }
  );

  return response.data;
}

// delete
export async function deleteUrl(id: number | string): Promise<void> {
  await axiosClient.delete("/api/url-shortener", {
    method: "DELETE",
    data: { id: id },
  });
}

export async function getUsersLinkList() {
  const response = await axiosClient.get("/api/users-link-list");
  return response.data;
}

export async function loginAdmin(email: string, password: string) {
  const response = await axiosClient.post("/api/auth/login-admin", {
    email,
    password,
  });
  return response.data;
}

export async function getAllLinks() {
  const response = await axiosClient.get("/api/links");
  return response.data;
}

export async function getAllUsers() {
  const response = await axiosClient.get("/api/users");
  return response.data;
}
