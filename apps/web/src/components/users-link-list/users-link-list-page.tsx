"use client";

import { useQuery } from "@tanstack/react-query";
import { ShortenedUrlProps } from "@types";
import { Session } from "next-auth";
import Image from "next/image";
import { ErrorClient } from "~components/react-query/error-client";
import { Heading } from "~components/ui/typography";
import { getUsersLinkList } from "~services";
import { TableLinksList } from "./table-links-list";

const arr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function UsersLinkListPage({ session }: { session: Session }) {
  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ["get-users-link-list"],
    queryFn: async () => await getUsersLinkList(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if ((!data && isError) || isPending)
    return (
      <section
        data-cy="loading-users-link-list"
        className="max-w-5xl w-full flex flex-col rounded-md justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center space-x-3">
            <div className="w-52 h-10 bg-slate-300 dark:bg-accent animate-pulse"></div>
            <div className="rounded-full w-10 h-10 animate-pulse bg-slate-300 dark:bg-accent"></div>
          </div>
          <div className="h-5 w-32 bg-slate-300 dark:bg-accent animate-pulse mt-4"></div>
          <div className="mt-8 w-full space-y-2">
            {arr.map((item) => (
              <div
                key={item}
                className="h-12 bg-slate-300 dark:bg-accent animate-pulse w-full"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  if (isError || typeof data.data === "undefined") return <ErrorClient />;

  const usersLinkList = data.data as ShortenedUrlProps[];

  return (
    <>
      <section className="max-w-5xl w-full flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3">
            {/** Title */}
            <Heading
              data-cy="heading-users-link-list"
              as="h2"
              className="font-bold border-b-0 pb-0 tracking-normal"
            >
              Your Link List
            </Heading>
            {/** User's image */}
            <Image
              data-cy="user-image"
              className="rounded-full"
              src={session.user.image ?? "/images/no-image.jpeg"}
              alt={session.user.name}
              width={40}
              height={40}
              draggable={false}
            />
          </div>
          <p data-cy="user-email" className="font-medium mt-2">
            {session.user.email}
          </p>
        </div>
        {/** Table of data */}
        <TableLinksList usersLinkList={usersLinkList} refetch={refetch} />
      </section>
    </>
  );
}
