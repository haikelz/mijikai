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
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/db";
import { ShortenedUrlProps } from "~types";

import { DeleteLinkButton } from "./client";

const baseMetadata = {
  title: "Users Link List",
  description: "Users Link List",
  url: `${SITE_URL}/users-link-list`,
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
    siteName: "mijikai.space/users-link-list",
    images: [
      {
        url: DEFAULT_OG_URL,
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

export default async function UsersLinkList() {
  const session = (await getServerSession(options)) as Session;
  const usersLinkList = await getUsersLinkList(session.user.email as string);

  if (!session) return redirect("/");

  return (
    <section className="max-w-3xl w-full flex flex-col justify-center items-center">
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
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Original URL</TableHead>
            <TableHead className="font-bold">Shortened URL</TableHead>
            <TableHead className="font-bold">Actions</TableHead>
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
                    {item.original_url.replace(/^https?\:\/\//gi, "")}
                  </Link>
                </TableCell>
                <TableCell className="font-bold underline underline-offset-2">
                  <Link
                    href={item.shortened_url}
                    target="_blank"
                    rel="noreferreer noopener"
                  >
                    {item.shortened_url.replace(
                      /^https?\:\/\/mijikai.space\//gi,
                      ""
                    )}
                  </Link>
                </TableCell>
                <TableCell>
                  <DeleteLinkButton id={Number(item.id)} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="font-medium">No data</TableCell>
              <TableCell className="font-medium">No data</TableCell>
              <TableCell className="font-medium">No data</TableCell>
              <TableCell className="font-medium">No data</TableCell>
              <TableCell className="font-medium">No data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
