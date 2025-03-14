import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    (await cookies()).delete("admin-auth-token");

    return NextResponse.json({
      status: "SUCCESS!",
      message: "Logout Success!",
    });
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
