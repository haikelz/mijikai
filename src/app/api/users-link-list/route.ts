import { NextRequest, NextResponse } from "next/server";
import { db } from "~lib/utils/db";

export async function GET(req: NextRequest, res: Response) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    const { data, error } = await db
      .from("shortened_url")
      .select()
      .eq("email", email);

    if (error) throw error;

    return NextResponse.json({ status: 200, message: "Success!", data: data });
  } catch (err) {
    return NextResponse.json(
      { message: `Failed to fetch API, server error!`, err },
      { status: 500 }
    );
  }
}
