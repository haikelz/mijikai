"use client";

import { ShortenedUrlProps } from "@types";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~components/ui/table";

const tableHeadData: Array<{ id: number; content: string }> = [
  {
    id: 1,
    content: "ID",
  },
  {
    id: 2,
    content: "Image",
  },
  {
    id: 3,
    content: "Email",
  },
  {
    id: 4,
    content: "Name",
  },
];

const tableBodyNoData: Array<number> = [1, 2, 3, 4, 5];

export function TableUsers({ users }: { users: ShortenedUrlProps[] }) {
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
        {users.length && users ? (
          users.map((item) => (
            <TableRow key={item.id}>
              <TableCell data-cy="table-id" className="font-medium">
                {item.id}
              </TableCell>
              <TableCell data-cy="table-image" className="font-medium">
                <Image
                  className="rounded-full"
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                />
              </TableCell>
              <TableCell data-cy="table-email" className="font-medium">
                {item.email}
              </TableCell>
              <TableCell data-cy="table-name" className="font-medium">
                {item.name}
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
