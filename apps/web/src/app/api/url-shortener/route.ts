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

export async function POST(req: Request): PostOperationProps {
  try {
    const session = (await getServerSession(options)) as Session;
    const { url, custom_slug, is_custom_slug } = await req.json();

    const customUrl = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 5);
    const randomizedUrl = customUrl();

    if (is_custom_slug) {
      const { data, error } = await db
        .from("shortened_url")
        .select("shortened_url")
        .eq("shortened_url", `https://mijikai.space/${custom_slug}`);

      /**
       * Detect if custom_slug same as shortened_url from supabase
       * If true, then throw error
       * Otherwise, don't return anything and go to the next code below
       */
      if (
        (data!.length &&
          data![0].shortened_url === `https://mijikai.space/${custom_slug}`) ||
        error
      ) {
        throw error;
      }
    }

    const { error } = await db.from("shortened_url").insert([
      {
        original_url: url,
        shortened_url: `https://mijikai.space/${
          is_custom_slug ? custom_slug : randomizedUrl
        }`,
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
          shortened_url: is_custom_slug ? custom_slug : randomizedUrl,
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

type DeleteOperationProps = Promise<
  | NextResponse<{
      status: string;
    }>
  | NextResponse<{
      message: string;
      err: unknown;
    }>
>;

export async function DELETE(req: Request): DeleteOperationProps {
  try {
    const { id } = await req.json();

    const { error } = await db.from("shortened_url").delete().eq("id", id);

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
