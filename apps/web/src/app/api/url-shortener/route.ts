import { customAlphabet } from "nanoid";
import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "~lib/utils/db";

import { ALPHABET_AND_NUMBER, SITE_URL } from "~lib/utils/constants";
import { options } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  try {
    const session = (await getServerSession(options)) as Session;
    const { url, custom_slug, is_custom_slug } = await req.json();

    const customUrl = customAlphabet(ALPHABET_AND_NUMBER, 5);
    const randomizedUrl = customUrl();

    if (is_custom_slug) {
      const { data, error } = await db
        .from("shortened_url")
        .select("shortened_url")
        .eq("shortened_url", `${SITE_URL}/${custom_slug}`);

      /**
       * Detect if custom_slug same as shortened_url from supabase
       * If true, then throw error
       * Otherwise, don't return anything and go to the next code below
       */
      if (
        (data!.length &&
          data![0].shortened_url === `${SITE_URL}/${custom_slug}`) ||
        error
      ) {
        return NextResponse.json(
          {
            status: "BAD REQUEST!",
            message: "Failed to shorten URL, found the same custom slug!",
          },
          {
            status: 400,
          }
        );
      }
    }

    // insert data to supabase
    const { error } = await db.from("shortened_url").insert([
      {
        original_url: url,
        shortened_url: `${SITE_URL}/${
          is_custom_slug ? custom_slug : randomizedUrl
        }`,
        email: session.user.email,
        image: session.user.image,
        name: session.user.name,
      },
    ]);

    if (error) {
      return NextResponse.json(
        {
          status: "BAD REQUEST!",
          message: "Failed to shorten URL, bad request!",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "SUCCESS!",
        message: "Success shorten URL!",
        data: {
          original_url: url,
          shortened_url: is_custom_slug ? custom_slug : randomizedUrl,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        status: "SERVER ERROR!",
        message: `Failed to do POST Operation, server error!`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    // delete data based on id
    const { error } = await db.from("shortened_url").delete().eq("id", id);

    if (error) throw error;

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
