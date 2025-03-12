import { cookies } from "next/headers";
import { db } from "~lib/utils/db";

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

  (await cookies()).set("admin-token", btoa(JSON.stringify(sessionData)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expirationDate,
    path: "/",
  });
}
