import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "~app/api/auth/[...nextauth]/options";
import { SITE_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const editData = await req.json();
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

    const { data, error } = await db
      .from("shortened_url")
      .update({
        original_url: editData.original_url,
        shortened_url: `${SITE_URL}/${editData.shortened_url}`,
      })
      .eq("id", id);

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
        message: "Success edit user!",
        data,
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
