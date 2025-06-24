import {
  CreateNewUrlProps,
  ResponseStatusProps,
  ShortenedUrlProps,
} from "@types";
import { axiosClient } from "~lib/utils/axios-config";

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

export async function getAllUsersLinksAdmin(): Promise<
  ResponseStatusProps<ShortenedUrlProps[]>
> {
  try {
    const response = await axiosClient.get("/api/admin/links");
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function getAllUsers(): Promise<
  ResponseStatusProps<ShortenedUrlProps[]>
> {
  try {
    const response = await axiosClient.get("/api/admin/users");
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

export async function editUserUrlAdmin(
  id: string,
  data: Omit<CreateNewUrlProps, "is_custom_slug">
) {
  try {
    const response = await axiosClient.put(`/api/admin/links/${id}`, {
      original_url: data.url,
      shortened_url: data.custom_slug,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function deleteUserUrlAdmin(
  id: string
): Promise<ResponseStatusProps<any>> {
  try {
    const response = await axiosClient.delete(`/api/admin/links/${id}`, {
      method: "DELETE",
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}

export async function bulkDeleteUserUrlAdmin(ids: string[]) {
  try {
    const response = await axiosClient.delete("/api/admin/links/bulk-delete", {
      method: "DELETE",
      data: { ids },
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
}
