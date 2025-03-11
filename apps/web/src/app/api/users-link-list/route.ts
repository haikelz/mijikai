import { NextRequest, NextResponse } from "next/server";
import { db } from "~lib/utils/db";

export async function GET(req: NextRequest) {
  try {
    const { email } = await req.json();

    // get users link list from supabase
    const { data, error } = await db
      .from("shortened_url")
      .select("id, email, shortened_url, original_url, image, name")
      .eq("email", email);

    if (error) {
      return NextResponse.json(
        {
          status: "BAD REQUEST!",
          message: "Failed to get user link list, bad request!",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "SUCCESS!",
        message: "Success get all users link!",
        data,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "SERVER ERROR!",
        message: "Failed to get the user link list, server error!",
      },
      { status: 500 }
    );
  }
}
