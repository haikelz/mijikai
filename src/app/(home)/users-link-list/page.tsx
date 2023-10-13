import { getServerSession } from "next-auth";
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
import { db } from "~lib/utils/db";
import { ShortenedUrlProps } from "~types";

async function getUsersLinkList(email: string): Promise<ShortenedUrlProps[]> {
  const { data, error } = await db
    .from("shortened_url")
    .select()
    .eq("email", email);

  if (error) throw error;
  return data;
}

export default async function UsersLinkList() {
  const session = await getServerSession(options);
  const usersLinkList = await getUsersLinkList(session?.user.email as string);

  if (!session) return redirect("/login");

  return (
    <section className="max-w-2xl w-full flex flex-col justify-center items-center">
      <div className="w-full">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3">
            <Heading
              as="h2"
              className="font-bold border-b-0 pb-0 tracking-normal"
            >
              Your Link list
            </Heading>
            <Image
              className="rounded-full"
              src={session.user.image}
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersLinkList.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.email}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="font-bold underline underline-offset-2">
                  <Link
                    href={`https://${item.original_url}`}
                    target="_blank"
                    rel="noreferreer noopener"
                  >
                    {item.original_url}
                  </Link>
                </TableCell>
                <TableCell className="font-bold underline underline-offset-2">
                  <Link
                    href={`https://mijikai.space/${item.shortened_url}`}
                    target="_blank"
                    rel="noreferreer noopener"
                  >
                    {item.shortened_url}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
