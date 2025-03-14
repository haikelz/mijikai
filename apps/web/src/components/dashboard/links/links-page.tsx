"use client";

import { useQuery } from "@tanstack/react-query";
import { ShortenedUrlProps } from "@types";
import { TableLinks } from "~components/dashboard/links/table-links";
import { getAllLinks } from "~services";

export default function DashboardAdminLinksPage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["get-links"],
    queryFn: async () => await getAllLinks(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
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
