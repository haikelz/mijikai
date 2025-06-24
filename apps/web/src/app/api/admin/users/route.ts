import { NextRequest, NextResponse } from "next/server";
import { checkAvailableAdminAuthToken } from "~app/actions";
import { db } from "~lib/utils/db";

export async function GET(req: NextRequest) {
  try {
    const isAvailableAdminAuthToken = checkAvailableAdminAuthToken(req);

    if (
      !isAvailableAdminAuthToken.isAvailable ||
      isAvailableAdminAuthToken.isExpired
    ) {
      return NextResponse.json(
        {
          status: "UNAUTHORIZED",
          message: "Unauthorized! You're not admin!",
        },
        { status: 401 }
      );
    }

    const { data, error } = await db
      .from("shortened_url")
      .select("id, email, image, name")
      .order("created_at", { ascending: true });

    const emails = new Set();
    const users = data?.filter(
      (item) => !emails.has(item.email) && emails.add(item.email)
    );

    if (error) {
      return NextResponse.json(
        {
          status: "BAD REQUEST!",
          message: "Failed to get all users, bad request!",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "SUCCESS!",
        message: "Success get all users!",
        data: users,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "SERVER ERROR!",
        message: "There is something wrong in server side!",
      },
      { status: 500 }
    );
  }
}
