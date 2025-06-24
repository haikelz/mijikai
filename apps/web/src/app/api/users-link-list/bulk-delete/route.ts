import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "~app/api/auth/[...nextauth]/options";
import { db } from "~lib/utils/db";

export async function DELETE(req: Request) {
  try {
    const session = (await getServerSession(options)) as Session;

    if (!session) {
      return NextResponse.json(
        {
          status: "UNAUTHORIZED",
          message: "Unauthorized! You're not logged in!",
        },
        { status: 401 }
      );
    }

    const { ids, email } = await req.json();

    const { error } = await db
      .from("shortened_url")
      .delete()
      .in("id", ids)
      .eq("email", email);

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
