import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Image from "next/image";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import { Heading } from "~components/ui/typography";
import { TableLinkList } from "~components/users-link-list/table-link-list";
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
    siteName: "mijikai.space/users-link-list",
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
      <section className="max-w-5xl w-full flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3">
            {/** Title */}
            <Heading
              data-cy="heading-users-link-list"
              as="h2"
              className="font-bold border-b-0 pb-0 tracking-normal"
            >
              Your Link List
            </Heading>
            {/** User's image */}
            <Image
              data-cy="user-image"
              className="rounded-full"
              src={session.user.image ?? "/images/no-image.jpeg"}
              alt={session.user.name}
              width={40}
              height={40}
              draggable={false}
            />
          </div>
          <p data-cy="user-email" className="font-medium mt-2">
            {session.user.email}
          </p>
        </div>
        {/** Table of data */}
        <TableLinkList />
      </section>
      <BackToTop />
      <ModalSuccessDeleteLink />
      <ModalConfirmDeleteLink />
    </>
  );
}
