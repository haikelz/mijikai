import { NextRequest, NextResponse } from "next/server";
import { env } from "~env.mjs";
import { db } from "~lib/utils/db";

const { NEXT_PUBLIC_PRODUCTION_URL } = env;

export default async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown> | undefined> {
  if (req.method === "GET") {
    try {
      const pathname: string[] = req.nextUrl.pathname.split("/");
      const slug: string = pathname[pathname.length - 1];

      const { data, error } = await db
        .from("shortened_url")
        .select("original_url")
        .eq("shortened_url", `${NEXT_PUBLIC_PRODUCTION_URL}/${slug}`)
        .single();

      if (error) throw error;

      return NextResponse.redirect(data.original_url);
    } catch (err) {
      console.error(err);
    }
  }
}

export const config = {
  matcher: "/((?!.*\\.|session|users-link-list|api|img|static|favicon.ico).*)",
};
