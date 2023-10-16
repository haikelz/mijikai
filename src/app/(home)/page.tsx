import { getServerSession } from "next-auth";
import { options } from "~app/api/auth/[...nextauth]/options";
import { Heading, Paragraph } from "~components/ui/typography";
import { tw } from "~lib/helpers";
import { SITE_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/db";
import { Og } from "~lib/utils/enums";

import HomeClient, { SignOut } from "./client";

const baseMetadata = {
  title: "Mijikai",
  description: "Mijikai is a free shorten URL Website. No ads, no tracker!",
  url: SITE_URL,
};

const { title, description, url } = baseMetadata;

export const metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: "mijikai.space",
    images: [
      {
        url: Og.DEFAULT_OG_URL,
        alt: "OG Image",
      },
    ],
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

async function getTotal(): Promise<number> {
  const { count, error } = await db
    .from("shortened_url")
    .select("id", { count: "exact", head: true });

  if (error) throw error;
  return count as number;
}

export default async function Home() {
  const totalShortenedUrl = await getTotal();
  const session = await getServerSession(options);

  return (
    <main
      className={tw(
        "w-full max-w-full min-h-screen flex justify-center",
        "items-center p-4"
      )}
    >
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
    </main>
  );
}
