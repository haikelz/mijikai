"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getAllUsers, getAllUsersLinksAdmin } from "~services/admin";

export function DashboardAdminPage() {
  const links = useQuery({
    queryKey: ["get-all-links"],
    queryFn: async () => await getAllUsersLinksAdmin(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const users = useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => await getAllUsers(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="w-full md:col-span-2 space-x-6 bg-slate-100 rounded-xl dark:bg-slate-900 p-4 flex flex-col md:flex-row justify-start items-start">
        <Image
          src="https://avatars.githubusercontent.com/u/77146709?v=4"
          alt="admin image"
          width={500}
          height={500}
          className="w-full md:w-44 h-60 md:h-44 rounded-xl"
        />
        <div className="mt-3 md:mt-0">
          <h1 className="text-3xl font-extrabold">Selamat datang, Admin!</h1>
          <p className="mt-3 text-lg text-justify">
            Yuk kita pantau performa link, atur pengguna, dan pastikan setiap
            URL bekerja secara efisien! Mari berproses menuju masa depan yang
            lebih baik lagi!
          </p>
        </div>
      </div>
      {users.isPending ? (
        <div className="bg-slate-100 dark:bg-slate-900 h-fit p-4 rounded-xl">
          <h3 className="text-2xl font-bold">Total Users</h3>
          <div className="h-6 mt-3 bg-slate-200 dark:bg-slate-950 animate-pulse w-20"></div>
        </div>
      ) : (
        <div className="bg-slate-100 dark:bg-slate-900 h-fit p-4 rounded-xl">
          <h3 className="text-2xl font-bold">Total Users</h3>
          <p className="text-lg mt-3">{users.data?.data?.length} Users</p>
        </div>
      )}
      {links.isPending ? (
        <div className="bg-slate-100 dark:bg-slate-900 h-fit p-4 rounded-xl">
          <h3 className="text-2xl font-bold">Total Shortened Links</h3>
          <div className="h-6 mt-3 bg-slate-200 dark:bg-slate-950 animate-pulse w-20"></div>
        </div>
      ) : (
        <div className="bg-slate-100 dark:bg-slate-900 h-fit p-4 rounded-xl">
          <h3 className="text-2xl font-bold">Total Shortened Links</h3>
          <p className="text-lg mt-3">{links.data?.data?.length} Links</p>
        </div>
      )}
    </div>
  );
}
