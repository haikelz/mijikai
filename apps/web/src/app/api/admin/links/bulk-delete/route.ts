import { NextRequest, NextResponse } from "next/server";
import { checkAvailableAdminAuthToken } from "~app/actions";
import { db } from "~lib/utils/db";

export async function DELETE(req: NextRequest) {
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

    const { ids } = await req.json();
    const { error } = await db.from("shortened_url").delete().in("id", ids);

    if (error) {
      return NextResponse.json(
        {
          status: "BAD REQUEST!",
          message: "Failed to delete specified list of URL, bad request!",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "SUCCESS!",
        message: "Success delete specified list of URL!",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "SERVER ERROR!",
        message: `Failed to do DELETE Operation, server error!`,
      },
      { status: 500 }
    );
  }
}
