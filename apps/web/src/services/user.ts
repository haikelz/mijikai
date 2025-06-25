import {
  CreateNewUrlProps,
  ResponseStatusProps,
  ShortenedUrlProps,
} from "@types";
import { axiosClient } from "~lib/utils/axios-config";

export async function createNewUserUrl({
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

export async function deleteUserUrl(
  id: string
): Promise<ResponseStatusProps<any>> {
  try {
    const response = await axiosClient.delete(`/api/users-link-list/${id}`, {
      method: "DELETE",
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function bulkDeleteUserUrl({
  ids,
  email,
}: {
  ids: string[];
  email: string;
}) {
  try {
    const response = await axiosClient.delete(
      "/api/users-link-list/bulk-delete",
      {
        method: "DELETE",
        data: { ids, email },
      }
    );

    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function getUserLinkList(): Promise<
  ResponseStatusProps<ShortenedUrlProps[]>
> {
  try {
    const response = await axiosClient.get("/api/users-link-list");
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function editUserUrl(
  id: string,
  data: Omit<CreateNewUrlProps, "is_custom_slug">
) {
  try {
    const response = await axiosClient.put(`/api/users-link-list/${id}`, {
      original_url: data.url,
      shortened_url: data.custom_slug,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}
