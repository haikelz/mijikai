"use client";

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ShortenedUrlProps } from "@types";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "~components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~components/ui/dialog";
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
    content: "Created At",
  },
  {
    id: 6,
    content: "Actions",
  },
];

const tableBodyNoData: Array<number> = [1, 2, 3, 4, 5];

type Props = {
  links: ShortenedUrlProps[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

export function TableLinks({ links, refetch }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => await deleteUrl(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        exact: true,
      });
      refetch();
      toast.success("Success delete URL!", { closeButton: true });
    },
    onError: () => {
      return toast.error("Error delete URL!", { closeButton: true });
    },
  });

  async function handleDelete(id: string) {
    await deleteMutation.mutateAsync(id);
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
              <TableCell data-cy="table-created-at" className="font-medium">
                {format(item.created_at, "dd MMMM yyyy, HH.m")}
              </TableCell>
              <TableCell data-cy="table-actions">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Warning!</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this link?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">No</Button>
                      </DialogClose>
                      <Button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          "Yes"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
