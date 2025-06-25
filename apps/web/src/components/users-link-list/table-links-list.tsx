"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Cell,
  type ColumnDef,
  type HeaderGroup,
  type Row,
} from "@tanstack/react-table";
import { ShortenedUrlProps } from "@types";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~components/ui/button";
import { Checkbox } from "~components/ui/checkbox";
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
import { Input } from "~components/ui/input";
import { Label } from "~components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~components/ui/table";
import { replaceHttpsPrefix } from "~lib/helpers";
import { editShortenedLinkSchema } from "~lib/utils/schema";
import { bulkDeleteUserUrl, deleteUserUrl, editUserUrl } from "~services/user";

type Props = {
  usersLinkList: ShortenedUrlProps[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  session: Session;
};

type FormData = {
  original_url: string;
  custom_slug: string;
};

export function TableLinksList({ usersLinkList, refetch, session }: Props) {
  const queryClient = useQueryClient();
  const [rowSelection, setRowSelection] = useState({});
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);

  const {
    getValues,
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      original_url: "",
      custom_slug: "",
    },
    resolver: zodResolver(editShortenedLinkSchema),
  });

  const editMutation = useMutation({
    mutationFn: async (id: string) =>
      await editUserUrl(id, {
        url: getValues("original_url"),
        custom_slug: getValues("custom_slug"),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        exact: true,
      });
      refetch();
      toast.success("Success edit URL!", { closeButton: true });
    },
    onError: (data) => {
      return toast.error("Error edit URL!", { description: data.message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => await deleteUserUrl(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        exact: true,
      });
      refetch();
      toast.success("Success delete URL!", { closeButton: true });
    },
    onError: (data) => {
      return toast.error("Error delete URL!", { description: data.message });
    },
  });

  async function handleDelete(id: string) {
    await deleteMutation.mutateAsync(id);
  }

  async function handleEdit(id: string) {
    await editMutation.mutateAsync(id);
  }

  const columns = useMemo<ColumnDef<ShortenedUrlProps>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }: { row: Row<ShortenedUrlProps> }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 32,
        minSize: 32,
        maxSize: 32,
      },
      {
        accessorKey: "original_url",
        header: "Original URL",
        cell: ({ row }: { row: Row<ShortenedUrlProps> }) => (
          <Link
            href={row.original.original_url}
            target="_blank"
            rel="noopener noreferrer"
            data-cy="table-original-url"
            className="font-bold underline underline-offset-2"
          >
            {replaceHttpsPrefix(row.original.original_url)}
          </Link>
        ),
      },
      {
        accessorKey: "shortened_url",
        header: "Shortened URL",
        cell: ({ row }: { row: Row<ShortenedUrlProps> }) => (
          <Link
            href={row.original.shortened_url}
            target="_blank"
            rel="noreferreer noopener"
            data-cy="table-shortened-url"
            className="font-bold underline underline-offset-2"
          >
            {replaceHttpsPrefix(row.original.shortened_url)}
          </Link>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }: { row: Row<ShortenedUrlProps> }) => (
          <span data-cy="table-created-at" className="font-medium">
            {format(row.original.created_at, "dd MMMM yyyy, HH.m")}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: { row: Row<ShortenedUrlProps> }) => (
          <div data-cy="table-actions" className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setValue("original_url", row.original.original_url);
                    setValue(
                      "custom_slug",
                      row.original.shortened_url.split("/")[3] || ""
                    );
                  }}
                >
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Shortened Link</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(() => handleEdit(row.original.id))}
                >
                  <div className="my-2 space-y-2">
                    <div className="">
                      <Label htmlFor="original_url">Original URL</Label>
                      <Input
                        id="original_url"
                        {...register("original_url")}
                        className="mt-1"
                      />
                      {errors.original_url ? (
                        <span className="mt-1 text-red-500 font-semibold text-xs">
                          {errors.original_url.message}
                        </span>
                      ) : null}
                    </div>
                    <div className="">
                      <Label htmlFor="custom_slug">Custom Slug</Label>
                      <Input
                        id="custom_slug"
                        {...register("custom_slug")}
                        className="mt-1"
                      />
                      {errors.custom_slug ? (
                        <span className="mt-1 text-red-500 font-semibold text-xs">
                          {errors.custom_slug.message}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={editMutation.isPending}>
                      {editMutation.isPending ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        "Edit"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="button"
                    onClick={() => handleDelete(row.original.id)}
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
          </div>
        ),
      },
    ],
    [
      deleteMutation.isPending,
      editMutation.isPending,
      handleDelete,
      handleEdit,
      setValue,
      register,
      errors,
      handleSubmit,
    ]
  );

  const table = useReactTable({
    data: usersLinkList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);

  const bulkDeleteMutation = useMutation({
    mutationFn: async () =>
      await bulkDeleteUserUrl({ ids: selectedIds, email: session.user.email }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ exact: true });
      refetch();
      setRowSelection({});
      setBulkDialogOpen(false);
      toast.success("Success bulk delete URLs!", { closeButton: true });
    },
    onError: () => {
      return toast.error("Error bulk delete URLs!", { closeButton: true });
    },
  });

  async function handleBulkDelete() {
    await bulkDeleteMutation.mutateAsync();
  }

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              onClick={() => setBulkDialogOpen(true)}
              disabled={bulkDeleteMutation.isPending}
            >
              Bulk Delete ({selectedIds.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Warning!</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedIds.length} selected
                links?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={bulkDeleteMutation.isPending}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleBulkDelete}
                disabled={bulkDeleteMutation.isPending}
              >
                {bulkDeleteMutation.isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  "Yes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <Table className="mt-8">
        <TableHeader>
          {table
            .getHeaderGroups()
            .map((headerGroup: HeaderGroup<ShortenedUrlProps>) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(
                  (
                    header: import("@tanstack/react-table").Header<
                      ShortenedUrlProps,
                      unknown
                    >
                  ) => (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                )}
              </TableRow>
            ))}
        </TableHeader>
        <TableBody>
          {usersLinkList.length ? (
            table.getRowModel().rows.map((row: Row<ShortenedUrlProps>) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row
                  .getVisibleCells()
                  .map((cell: Cell<ShortenedUrlProps, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getHeaderGroups().length}
                className="text-center font-medium"
              >
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
