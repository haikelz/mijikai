"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChildrenProps } from "@types";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
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
            <LazyMotion features={domAnimation}>
              <AnimatePresence mode="wait">
                <m.div
                  className="w-full"
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {children}
                </m.div>
              </AnimatePresence>
            </LazyMotion>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
