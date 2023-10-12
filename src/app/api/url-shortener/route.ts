import { customAlphabet } from "nanoid";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "~lib/utils/db";
import { ShortenedUrlProps } from "~types";

import { options } from "../auth/[...nextauth]/options";

type PostOperationProps = Promise<
  | NextResponse<{
      status: string;
      data: Omit<
        ShortenedUrlProps,
        "id" | "created_at" | "image" | "name" | "email"
      >;
    }>
  | NextResponse<{
      message: string;
      err: unknown;
    }>
>;

export async function POST(req: Request, res: Response): PostOperationProps {
  try {
    const session = await getServerSession(options);
    const { url } = await req.json();

    const replaceHttpsUrl = url.replace(
      /^https?\:\/\/|^http?\:\/\/|^\:\/\//gi,
      ""
    );

    const customUrl = customAlphabet("abcdefghijklmnopqrstuvwxyz", 7);
    const randomizedUrl = customUrl();

    const { error } = await db.from("shortened_url").insert([
      {
        original_url: replaceHttpsUrl,
        shortened_url: randomizedUrl,
        email: session?.user.email,
        image: session?.user.image,
        name: session?.user.name,
      },
    ]);

    if (error) throw error;

    return NextResponse.json(
      {
        status: "OK",
        data: {
          original_url: replaceHttpsUrl,
          shortened_url: randomizedUrl,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Failed to fetch API, server error!`, err },
      { status: 500 }
    );
  }
}
