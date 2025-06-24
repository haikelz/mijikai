"use client";

import { useQuery } from "@tanstack/react-query";
import { ShortenedUrlProps } from "@types";
import { ErrorClient } from "~components/react-query/error-client";
import { getAllUsers } from "~services/admin";
import { TableUsers } from "./table-users";

export default function DashboardAdminUsersPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => await getAllUsers(),
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
  if (isError) return <ErrorClient />;

  const users = data.data as ShortenedUrlProps[];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
        <TableUsers users={users} />
      </div>
    </div>
  );
}
