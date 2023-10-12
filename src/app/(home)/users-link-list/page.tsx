import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "~app/api/auth/[...nextauth]/options";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~components/ui/table";
import { Heading, Paragraph } from "~components/ui/typography";
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

  return (
    <div>
      <Heading as="h2" className="font-bold text-center">
        Your Link
      </Heading>
      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">Email</TableHead>
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
              <TableCell className="font-medium">{item.original_url}</TableCell>
              <TableCell className="font-medium underline underline-offset-2">
                <Link href={`https://mijikai.space/${item.shortened_url}`}>
                  https://mijikai.space/{item.shortened_url}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
