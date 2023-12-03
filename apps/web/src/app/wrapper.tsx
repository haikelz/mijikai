"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChildrenProps } from "@types";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function Wrapper({ children }: ChildrenProps) {
  const queryClient: QueryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
