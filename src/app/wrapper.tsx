"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { ChildrenProps } from "~types";

export default function Wrapper({ children }: ChildrenProps) {
  const queryClient: QueryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>{children}</Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
