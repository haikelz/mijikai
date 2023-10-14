import { customAlphabet } from "nanoid";
import { Session, getServerSession } from "next-auth";
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
    const session = (await getServerSession(options)) as Session;
    const { url } = await req.json();

    const customUrl = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 7);
    const randomizedUrl = customUrl();

    const { error } = await db.from("shortened_url").insert([
      {
        original_url: `https://${url}`,
        shortened_url: `https://mijikai.space/${randomizedUrl}`,
        email: session.user.email,
        image: session.user.image,
        name: session.user.name,
      },
    ]);

    if (error) throw error;

    return NextResponse.json(
      {
        status: "SUCCESS!",
        data: {
          original_url: url,
          shortened_url: randomizedUrl,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Failed to do POST Operation, server error!`, err },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    const { id } = await req.json();
    const { error } = await db
      .from("shortened_url")
      .delete({ count: "exact" })
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json(
      {
        status: "SUCCESS!",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Failed to do DELETE Operation, server error!`, err },
      { status: 500 }
    );
  }
}
