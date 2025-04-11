import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
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
import { deleteUrl, editUrl } from "~services";

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

export function TableLinksList({
  usersLinkList,
  refetch,
}: {
  usersLinkList: ShortenedUrlProps[];
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
}) {
  const {
    getValues,
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      original_url: "",
      custom_slug: "",
    },
    resolver: zodResolver(editShortenedLinkSchema),
  });

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async (id: string) =>
      await editUrl(id, {
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
    mutationFn: async (id: string) => await deleteUrl(id),
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
              <TableCell data-cy="table-created-at" className="font-medium">
                {format(item.created_at, "dd MMMM yyyy, HH.m")}
              </TableCell>
              <TableCell
                data-cy="table-actions"
                className="space-x-2 flex justify-center items-center"
              >
                <Dialog>
                  <DialogTrigger
                    asChild
                    onClick={() => {
                      setValue("original_url", item.original_url);
                      setValue("custom_slug", item.shortened_url);
                    }}
                  >
                    <Button>Edit</Button>
                  </DialogTrigger>
                  <DialogOverlay />
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Shortened Link</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(() => handleEdit(item.id))}>
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
                          <Button variant="outline">No</Button>
                        </DialogClose>
                        <Button type="submit" disabled={editMutation.isPending}>
                          {editMutation.isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            "Yes"
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
                  <DialogOverlay />
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
