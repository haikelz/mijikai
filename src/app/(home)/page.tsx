import { getServerSession } from "next-auth";
import { options } from "~app/api/auth/[...nextauth]/options";
import { Heading, Paragraph } from "~components/ui/typography";
import { db } from "~lib/utils/db";

import HomeClient, { SignOut } from "./client";

async function getTotal(): Promise<number> {
  const { count, error } = await db
    .from("shortened_url")
    .select("id", { count: "exact", head: true });

  if (error) throw error;
  return count as number;
}

async function getUsersLinkList(email: string) {
  const { data, error } = await db
    .from("shortened_url")
    .select("email")
    .eq("email", email);

  if (error) throw error;
  return data;
}

export default async function Home() {
  const totalShortenedUrl = await getTotal();
  const session = await getServerSession(options);

  return (
    <section className="max-w-xl w-full flex flex-col justify-center items-center">
      <div>
        <Heading as="h1">Mijikai / 短い</Heading>
        <Paragraph>
          Mijikai is a free shorten URL Website. <b>No ads, no tracker!</b>{" "}
          There are{" "}
          <b className="font-bold">
            {totalShortenedUrl} link{totalShortenedUrl <= 1 ? "" : "s"}
          </b>{" "}
          that already shortened using this service.{" "}
          {session ? (
            <>
              <span>Want to logout?</span> <SignOut />
            </>
          ) : null}
        </Paragraph>
        <HomeClient session={session} />
      </div>
    </section>
  );
}
