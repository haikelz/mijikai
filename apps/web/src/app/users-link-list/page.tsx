import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import UsersLinkListPage from "~components/users-link-list/users-link-list-page";
import { SITE_URL } from "~lib/utils/constants";
import { Og } from "~lib/utils/enums";

const ModalConfirmDeleteLink = dynamic(() =>
  import("~components/users-link-list/modal-confirm-delete-link").then(
    (comp) => comp.ModalConfirmDeleteLink
  )
);
const ModalSuccessDeleteLink = dynamic(() =>
  import("~components/users-link-list/modal-success-delete-link").then(
    (comp) => comp.ModalSuccessDeleteLink
  )
);
const BackToTop = dynamic(() =>
  import("~components/common/back-to-top").then((comp) => comp.BackToTop)
);

const baseMetadata = {
  title: "Users Link List",
  description: "Users Link List",
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
