"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { ThemeProvider } from "next-themes";
import { ChildrenProps } from "~types";

export default function Wrapper({ children }: ChildrenProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system" disableTransitionOnChange>
        <Provider>{children}</Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
