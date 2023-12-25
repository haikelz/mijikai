import { Metadata } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { options } from "~app/api/auth/[...nextauth]/options";
import { Heading, Paragraph } from "~components/ui/typography";
import { tw } from "~lib/helpers";
import { SITE_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/db";
import { Og } from "~lib/utils/enums";

import HomeClient, { SignOut } from "./client";

const SwitchTheme = dynamic(() => import("~components/ui/switch-theme"), {
  ssr: false,
  loading: () => (
    <div className="w-10 h-10 bg-slate-300 animate-pulse dark:bg-slate-700 rounded-md"></div>
  ),
});

export const revalidate = 60;

const baseMetadata = {
  title: "Mijikai",
  description: "Mijikai is a free shorten URL Website. No ads, no tracker!",
  url: SITE_URL,
};

const { title, description, url } = baseMetadata;

export const metadata: Metadata = {
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

// get total shortened URL
async function getTotalShortenedUrl(): Promise<number> {
  const { count, error } = await db.from("shortened_url").select("id", {
    count: "exact",
    head: true,
  });

  if (error) throw error;
  return count as number;
}

export default async function Home() {
  const totalShortenedUrl = await getTotalShortenedUrl();
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
          {/** Title and dark mode button */}
          <div className="w-full flex items-center justify-between">
            <Heading data-cy="heading-title" as="h1">
              Mijikai / 短い
            </Heading>
            <SwitchTheme />
          </div>
          {/** Description */}
          <Paragraph data-cy="description">
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
