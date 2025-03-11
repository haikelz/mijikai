"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~components/ui/table";
import { replaceHttpsPrefix } from "~lib/helpers";
import { ButtonDeleteLink } from "./button-delete-link";

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

export function TableLinkList() {
  // const {  data, isError, isPending} = useQuery({queryKey: [], queryFn: })

  return (
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
                <ButtonDeleteLink data-cy="delete-link-button" id={item.id} />
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
