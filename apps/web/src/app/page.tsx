import { Metadata } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Link from "next/link";
import { options } from "~app/api/auth/[...nextauth]/options";
import { Heading, Paragraph } from "~components/ui/typography";
import { env } from "~env.mjs";
import { tw } from "~lib/helpers";
import { SITE_URL } from "~lib/utils/constants";
import { Og } from "~lib/utils/enums";

import { List } from "lucide-react";
import { Info } from "~components/common/info";
import { FormShortener } from "~components/shortener/form-shortener";
import { SignOutButton } from "~components/shortener/sign-out-button";
import { Button } from "~components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~components/ui/tooltip";
import { getTotal, getUserTotal } from "./actions";

const { NEXT_PUBLIC_PRODUCTION_URL } = env;

const SwitchTheme = dynamic(
  () =>
    import("~components/common/switch-theme").then((comp) => comp.SwitchTheme),
  {
    loading: () => (
      <div className="w-10 h-10 bg-slate-300 animate-pulse dark:bg-slate-700 rounded-md"></div>
    ),
  }
);

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
    siteName: NEXT_PUBLIC_PRODUCTION_URL,
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

export default async function Home() {
  const session = await getServerSession(options);
  const totalShortenedUrl = await getTotal();
  const totalUserShortenedUrl = await getUserTotal(
    session?.user.email as string
  );

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
            <div className="flex justify-center items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/users-link-list">
                      <Button size="icon" variant="outline">
                        <List />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your Link List</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size="icon">
                      This service is under{" "}
                      <Link
                        href="https://github.com/haikelz/mijikai/blob/master/LICENSE"
                        className="font-semibold underline underline-offset-2"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Apache 2.0 License
                      </Link>
                      . Crafted by{" "}
                      <Link
                        href="https://github.com/haikelz"
                        className="font-semibold underline underline-offset-2"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Haikel
                      </Link>
                      .
                    </Info>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <SwitchTheme />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Switch Theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {/** Description */}
          <Paragraph data-cy="description">
            Mijikai is a free shorten URL Website. <b>No ads, no tracker!</b>{" "}
            There are{" "}
            <b className="font-bold">
              {totalShortenedUrl} link{totalShortenedUrl <= 1 ? "" : "s"}{" "}
            </b>{" "}
            that already shortened using this service
            {totalUserShortenedUrl >= 1
              ? `, and ${totalUserShortenedUrl} of them is your'${
                  totalShortenedUrl >= 1 ? "s" : null
                }.`
              : null}{" "}
            {session ? (
              <>
                <span>Want to logout?</span> <SignOutButton />
              </>
            ) : null}
          </Paragraph>
          <FormShortener session={session} />
        </div>
      </section>
    </main>
  );
}
