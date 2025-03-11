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
