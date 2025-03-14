"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getAllLinks, getAllUsers } from "~services";

export default function DashboardAdmin() {
  const links = useQuery({
    queryKey: ["get-all-links"],
    queryFn: async () => await getAllLinks(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const users = useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => await getAllUsers(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="w-full md:col-span-2 space-x-6 bg-slate-100 dark:bg-gray-900 p-4 flex flex-col md:flex-row justify-start items-start">
          <Image
            src="/images/no-image.jpeg"
            alt="emu otori"
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
          <div className="bg-slate-100 dark:bg-gray-900 h-20 p-4"></div>
        ) : (
          <div className="bg-slate-100 dark:bg-gray-900 h-fit p-4 rounded-xl">
            <h3 className="text-2xl font-bold">Total Users</h3>
            <p className="text-lg mt-3">{users.data.data.length} Users</p>
          </div>
        )}
        {links.isPending ? (
          <div className="bg-slate-100 dark:bg-gray-900 h-20 p-4"></div>
        ) : (
          <div className="bg-slate-100 dark:bg-gray-900 h-fit p-4 rounded-xl">
            <h3 className="text-2xl font-bold">Total Shortened Links</h3>
            <p className="text-lg mt-3">{links.data.data.length} Links</p>
          </div>
        )}
      </div>
    </div>
  );
}
