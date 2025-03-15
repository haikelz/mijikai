import { ResponseStatusProps, ShortenedUrlProps } from "@types";
import { axiosClient } from "~lib/utils/axios-config";

type CreateNewUrlProps = {
  url: string;
  custom_slug: string;
  is_custom_slug: boolean;
};

export async function createNewUrl({
  url,
  custom_slug,
  is_custom_slug,
}: CreateNewUrlProps): Promise<ResponseStatusProps<ShortenedUrlProps>> {
  const response = await axiosClient.post(
    "/api/url-shortener",
    { url, custom_slug: custom_slug, is_custom_slug: is_custom_slug },
    {
      method: "POST",
    }
  );

  return response.data;
}

export async function deleteUrl(id: string): Promise<ResponseStatusProps<any>> {
  const response = await axiosClient.delete("/api/url-shortener", {
    method: "DELETE",
    data: { id },
  });

  return response.data;
}

export async function getUsersLinkList(): Promise<
  ResponseStatusProps<ShortenedUrlProps[]>
> {
  const response = await axiosClient.get("/api/users-link-list");
  return response.data;
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<ResponseStatusProps<any>> {
  const response = await axiosClient.post("/api/auth/login-admin", {
    email,
    password,
  });

  return response.data;
}

export async function getAllLinks(): Promise<
  ResponseStatusProps<ShortenedUrlProps[]>
> {
  const response = await axiosClient.get("/api/links");
  return response.data;
}

export async function getAllUsers(): Promise<
  ResponseStatusProps<ShortenedUrlProps[]>
> {
  const response = await axiosClient.get("/api/users");
  return response.data;
}

export async function logoutAdmin(): Promise<ResponseStatusProps<any>> {
  const response = await axiosClient.post("/api/auth/logout-admin");
  return response.data;
}
