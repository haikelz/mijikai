import { NextRequest, NextResponse } from "next/server";
import { checkAvailableAdminAuthToken } from "~app/actions";
import { CONDITION, SITE_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/db";

export default async function middleware(
  req: NextRequest
): Promise<NextResponse<unknown> | undefined> {
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith("/auth/login-admin")) {
    const session = req.cookies.get(
      CONDITION === "development"
        ? "next-auth.session-token"
        : "__Secure-next-auth.session-token"
    );

    // For admin side, we didn't use any next-auth services.
    // So, we can redirect user who already logged in using Github/Google to homepage.
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const isAvailableAdminAuthToken = checkAvailableAdminAuthToken(req);

    if (
      isAvailableAdminAuthToken.isAvailable &&
      !isAvailableAdminAuthToken.isExpired
    ) {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
    const isAvailableAdminAuthToken = checkAvailableAdminAuthToken(req);

    if (
      !isAvailableAdminAuthToken.isAvailable ||
      isAvailableAdminAuthToken.isExpired
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (req.method === "GET") {
    try {
      const pathname: string[] = req.nextUrl.pathname.split("/");
      const slug: string = pathname[pathname.length - 1];

      const { data, error } = await db
        .from("shortened_url")
        .select("original_url")
        .eq("shortened_url", `${SITE_URL}/${slug}`)
        .single();

      if (error) throw error;

      return NextResponse.redirect(data.original_url);
    } catch (err) {
      console.error(err);
    }
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    "/((?!.*\\.|session|users-link-list|api|img|static|favicon.ico).*)",
    "/dashboard/:path*",
    "/auth/:path*",
  ],
};
