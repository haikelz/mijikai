import { ShortenedUrlProps } from "@types";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~components/ui/table";
import { Heading } from "~components/ui/typography";
import { replaceHttpsPrefix } from "~lib/helpers";
import { SITE_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/db";
import { Og } from "~lib/utils/enums";

import {
  ConfirmDeleteLinkModal,
  DeleteLinkButton,
  SuccessDeleteLinkModal,
} from "./client";

const BackToTop = dynamic(() => import("~components/back-to-top"));

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

// get users link list from supabase
async function getUsersLinkList(
  email: string
): Promise<Omit<ShortenedUrlProps, "created_at">[]> {
  const { data, error } = await db
    .from("shortened_url")
    .select("id, email, shortened_url, original_url, image, name")
    .eq("email", email);

  if (error) throw error;
  return data;
}

const tableHeadData: Array<{ id: number; content: string }> = [
  {
    id: 1,
    content: "Email",
  },
  {
    id: 2,
    content: "Name",
  },
  {
    id: 3,
    content: "Original URL",
  },
  {
    id: 4,
    content: "Shortened URL",
  },
  {
    id: 5,
    content: "Actions",
  },
];

export default async function UsersLinkList() {
  const session = (await getServerSession(options)) as Session;

  if (!session) return redirect("/");

  const usersLinkList = await getUsersLinkList(session.user.email);
  const tableBodyNoData: Array<number> = [1, 2, 3, 4, 5];

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
        <Table className="mt-8">
          <TableHeader>
            <TableRow>
              {tableHeadData.map((item) => (
                <TableHead key={item.id} className="font-bold">
                  {item.content}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersLinkList.length ? (
              usersLinkList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell data-cy="table-email" className="font-medium">
                    {item.email}
                  </TableCell>
                  <TableCell data-cy="table-name" className="font-medium">
                    {item.name}
                  </TableCell>
                  <TableCell
                    data-cy="table-original-url"
                    className="font-bold underline underline-offset-2"
                  >
                    <Link
                      href={item.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {replaceHttpsPrefix(item.original_url)}
                    </Link>
                  </TableCell>
                  <TableCell
                    data-cy="table-shortened-url"
                    className="font-bold underline underline-offset-2"
                  >
                    <Link
                      href={item.shortened_url}
                      target="_blank"
                      rel="noreferreer noopener"
                    >
                      {replaceHttpsPrefix(item.shortened_url)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <DeleteLinkButton
                      data-cy="delete-link-button"
                      id={item.id}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                {tableBodyNoData.map((item) => (
                  <TableCell key={item} className="font-medium">
                    No data
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
      <BackToTop />
      <SuccessDeleteLinkModal />
      <ConfirmDeleteLinkModal />
    </>
  );
}
