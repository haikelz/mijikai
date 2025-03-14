"use client";

import { useQuery } from "@tanstack/react-query";
import { ShortenedUrlProps } from "@types";
import { TableUsers } from "~components/dashboard/users/table-users";
import { getAllUsers } from "~services";

export default function DashboardAdminUsersPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => await getAllUsers(),
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

  const users = data.data as ShortenedUrlProps[];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-900 p-4">
        <TableUsers users={users} />
      </div>
    </div>
  );
}
