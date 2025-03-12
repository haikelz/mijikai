import { NextRequest, NextResponse } from "next/server";
import { env } from "~env.mjs";

const { ADMIN_PASSWORD, ADMIN_EMAIL } = env;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (email !== ADMIN_EMAIL && password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          status: "UNAUTHORIZED!",
          message: "Wrong Email and Password!",
        },
        { status: 401 }
      );
    } else if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        {
          status: "UNAUTHORIZED!",
          message: "Wrong Email",
        },
        { status: 401 }
      );
    } else if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          status: "UNAUTHORIZED!",
          message: "Wrong Password!",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        status: "SUCCESS!",
        message: "Login as Admin success!",
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
