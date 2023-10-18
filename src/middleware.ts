import { NextRequest, NextResponse } from "next/server";
import { db } from "~lib/utils/db";

export default async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown> | undefined> {
  if (req.method === "GET") {
    try {
      let pathname = req.nextUrl.pathname.split("/");
      let slug = pathname[pathname.length - 1];

      const { data, error } = await db
        .from("shortened_url")
        .select("original_url")
        .eq("shortened_url", `https://mijikai.space/${slug}`)
        .single();

      console.log(slug);

      if (error) throw error;

      return NextResponse.redirect(data.original_url);
    } catch (err) {
      console.error(err);
    }
  }
}

export const config = {
  matcher:
    "/((?!.*\\.|session|users-link-list|api|image|static|favicon.ico).*)",
};
