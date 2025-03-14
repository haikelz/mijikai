import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { env } from "~env.mjs";
import { db } from "~lib/utils/db";

const { ADMIN_EMAIL, ADMIN_PASSWORD } = env;

// get total shortened URL
export async function getTotal(): Promise<number> {
  const { count, error } = await db
    .from("shortened_url")
    .select("original_url", {
      count: "exact",
      head: true,
    });

  if (error) throw error;
  return count as number;
}

export async function getUserTotal(email: string): Promise<number> {
  const { count, error } = await db
    .from("shortened_url")
    .select("original_url", { count: "exact", head: true })
    .eq("email", email);

  if (error) throw error;
  return count as number;
}

export async function createSession<T>(data: T): Promise<void> {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const sessionData = {
    user: data,
    expires: expirationDate.toISOString(),
  };

  (await cookies()).set("admin-auth-token", btoa(JSON.stringify(sessionData)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expirationDate,
    path: "/",
  });
}

type AvailableAuthTokenProps = {
  isExpired: boolean;
  isAvailable: boolean;
};

export function checkAvailableAdminAuthToken(
  req: NextRequest
): AvailableAuthTokenProps {
  const authToken = req.cookies.get("admin-auth-token");

  if (!authToken) {
    return {
      isExpired: false,
      isAvailable: false,
    };
  }

  const tokenData = JSON.parse(atob(authToken?.value as string));
  const expirationDate = new Date(tokenData.expires);

  if (expirationDate < new Date()) {
    return {
      isExpired: true,
      isAvailable: false,
    };
  }

  if (
    tokenData.user.role !== "admin" ||
    tokenData.user.email !== ADMIN_EMAIL ||
    tokenData.user.password !== ADMIN_PASSWORD
  ) {
    return {
      isExpired: false,
      isAvailable: false,
    };
  }

  return {
    isExpired: false,
    isAvailable: true,
  };
}
