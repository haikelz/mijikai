import { ChildrenProps } from "@types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import { tw } from "~lib/helpers";
import { SITE_URL } from "~lib/utils/constants";
import { Og } from "~lib/utils/enums";

const baseMetadata = {
  title: "Mijikai",
  description: "Mijikai is a free shorten URL Website. No ads, no tracker!",
  url: `${SITE_URL}`,
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
    siteName: "mijikai.ekel.dev/users-link-list",
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

export default async function UsersLinkListLayout({ children }: ChildrenProps) {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/");
  }

  return (
    <main
      className={tw(
        "w-full max-w-full flex justify-center",
        "items-center p-4"
      )}
    >
      {children}
    </main>
  );
}
