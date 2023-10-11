import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Wrapper from "./wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mijikai",
  description: "Mijikai is a free shorten URL Website. No ads, no tracker!",
};

export default function RootLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Wrapper>
          <main className="w-full max-w-full flex justify-center md:min-h-screen items-center p-4">
            {children}
          </main>
        </Wrapper>
      </body>
    </html>
  );
}
