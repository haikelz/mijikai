import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";
import { db } from "~lib/utils/db";

type PostOperationProps = Promise<
  | NextResponse<{
      status: string;
      data: {
        original_url: string;
        shortened_url: string;
      };
    }>
  | NextResponse<{
      message: string;
      err: unknown;
    }>
>;

export async function POST(req: Request, res: Response): PostOperationProps {
  try {
    const { url } = await req.json();

    const replaceHttpsUrl = url.replace(/^https?\:\/\/|^http?\:\/\/|^\:\/\//gi, "");

    const customUrl = customAlphabet("abcdefghijklmnopqrstuvwxyz", 5);
    const randomizedUrl = customUrl();

    const { error } = await db.from("shortened_url").insert([
      {
        original_url: replaceHttpsUrl,
        shortened_url: randomizedUrl,
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
