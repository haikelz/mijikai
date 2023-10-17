import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
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
import { replaceHttpPrefix } from "~lib/helpers";
import { SITE_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/db";
import { Og } from "~lib/utils/enums";
import { ShortenedUrlProps } from "~types";

import {
  ConfirmDeleteLinkModal,
  DeleteLinkButton,
  SuccessModal,
} from "./client";

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

async function getUsersLinkList(email: string): Promise<ShortenedUrlProps[]> {
  const { data, error } = await db
    .from("shortened_url")
    .select()
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
  const usersLinkList = await getUsersLinkList(session.user.email);

  const tableBodyNoData: Array<number> = [1, 2, 3, 4, 5];

  if (!session) return redirect("/");

  return (
    <>
      <section className="max-w-5xl w-full flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3">
            <Heading
              as="h2"
              className="font-bold border-b-0 pb-0 tracking-normal"
            >
              Your Link List
            </Heading>
            <Image
              className="rounded-full"
              src={session.user.image ?? "/images/no-image.jpeg"}
              alt={session.user.name}
              width={40}
              height={40}
              draggable={false}
            />
          </div>
          <p className="font-medium mt-2">{session.user.email}</p>
        </div>
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
                  <TableCell className="font-medium">{item.email}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-bold underline underline-offset-2">
                    <Link
                      href={item.original_url}
                      target="_blank"
                      rel="noreferreer noopener"
                    >
                      {replaceHttpPrefix(item.original_url)}
                    </Link>
                  </TableCell>
                  <TableCell className="font-bold underline underline-offset-2">
                    <Link
                      href={item.shortened_url}
                      target="_blank"
                      rel="noreferreer noopener"
                    >
                      {replaceHttpPrefix(item.shortened_url)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <DeleteLinkButton id={item.id} />
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
      <SuccessModal />
      <ConfirmDeleteLinkModal />
    </>
  );
}
