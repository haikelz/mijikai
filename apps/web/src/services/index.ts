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
  try {
    const response = await axiosClient.post(
      "/api/url-shortener",
      { url, custom_slug, is_custom_slug },
      {
        method: "POST",
      }
    );

    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function deleteUrl(id: string): Promise<ResponseStatusProps<any>> {
  try {
    const response = await axiosClient.delete("/api/url-shortener", {
      method: "DELETE",
      data: { id },
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function getUsersLinkList(): Promise<
  ResponseStatusProps<ShortenedUrlProps[]>
> {
  try {
    const response = await axiosClient.get("/api/users-link-list");
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<ResponseStatusProps<any>> {
  try {
    const response = await axiosClient.post("/api/auth/login-admin", {
      email,
      password,
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function getAllLinks(): Promise<
  ResponseStatusProps<ShortenedUrlProps[]>
> {
  try {
    const response = await axiosClient.get("/api/links");
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function getAllUsers(): Promise<
  ResponseStatusProps<ShortenedUrlProps[]>
> {
  try {
    const response = await axiosClient.get("/api/users");
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function logoutAdmin(): Promise<ResponseStatusProps<any>> {
  try {
    const response = await axiosClient.post("/api/auth/logout-admin");
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function editUrl(
  id: string,
  data: Omit<CreateNewUrlProps, "is_custom_slug">
) {
  try {
    const response = await axiosClient.put(`/api/links/${id}/edit`, {
      original_url: data.url,
      shortened_url: data.custom_slug,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}
