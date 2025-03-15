import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import UsersLinkListPage from "~components/users-link-list/users-link-list-page";
import { SITE_URL } from "~lib/utils/constants";
import { Og } from "~lib/utils/enums";

const baseMetadata = {
  title: "Users Link List | Mijikai",
  description: "Mijikai is a free shorten URL Website. No ads, no tracker!",
  url: `${SITE_URL}/users-link-list`,
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

export default async function UsersLinkList() {
  const session = (await getServerSession(options)) as Session;

  if (!session) return redirect("/");

  return (
    <>
      <UsersLinkListPage session={session} />
    </>
  );
}
