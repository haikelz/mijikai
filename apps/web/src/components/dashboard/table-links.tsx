"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShortenedUrlProps } from "@types";
import { useAtom } from "jotai";
import Link from "next/link";
import { idLinkStringAtom } from "~app/dashboard/admin/page";
import { Button } from "~components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~components/ui/table";
import { replaceHttpsPrefix } from "~lib/helpers";
import { deleteUrl } from "~services";

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

const tableBodyNoData: Array<number> = [1, 2, 3, 4, 5];

export function TableLinks({ links }: { links: ShortenedUrlProps[] }) {
  const [idLinkString, setIdLinkString] = useAtom(idLinkStringAtom);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteUrl(idLinkString),
    mutationKey: [idLinkString],
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: [idLinkString],
        exact: true,
      }),
  });

  async function handleDelete(id: string) {
    setIdLinkString(id);
    await deleteMutation.mutateAsync().then(() => {});
  }

  return (
    <Table>
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
        {links.length && links ? (
          links.map((item) => (
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
                <Button
                  data-cy="confirm-delete-link-button"
                  type="button"
                  aria-label="confirm delete link"
                  variant="destructive"
                  className="font-bold"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
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
  );
}
