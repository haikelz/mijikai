"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShortenedUrlProps } from "@types";
import { useAtomValue } from "jotai";
import { TableLinks } from "~components/dashboard/links/table-links";
import { deleteUrl, getAllLinks } from "~services";
import { idLinkStringAtom } from "~store";

export default function DashboardAdminLinksPage() {
  const idLinkString = useAtomValue(idLinkStringAtom);

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

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["get-links"],
    queryFn: async () => await getAllLinks(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isPending)
    return (
      <div className="w-full p-4">
        <div className="aspect-video rounded-xl bg-slate-200 dark:bg-slate-900 p-4 animate-pulse" />
      </div>
    );
  if (isError) return <p>500 Server Error!</p>;

  const links = data.data as ShortenedUrlProps[];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
        <TableLinks links={links} refetch={refetch} />
      </div>
    </div>
  );
}
