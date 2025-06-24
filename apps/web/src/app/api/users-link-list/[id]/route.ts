import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "~app/api/auth/[...nextauth]/options";
import { SITE_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json(
        {
          status: "UNAUTHORIZED",
          message: "Unauthorized!",
        },
        { status: 401 }
      );
    }

    // delete data based on id
    const { error } = await db.from("shortened_url").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          status: "BAD REQUEST!",
          message: "Failed to delete specified URL, bad request!",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "SUCCESS!",
        message: "Success delete specified URL!",
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json(
        {
          status: "UNAUTHORIZED",
          message: "Unauthorized!",
        },
        { status: 401 }
      );
    }

    const editData = await req.json();

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
          message: "Failed to get edit link, bad request!",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "SUCCESS!",
        message: "Success edit link!",
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
