import { ChildrenProps } from "@types";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { env } from "~env.mjs";
import { tw } from "~lib/helpers";
import { SITE_URL } from "~lib/utils/constants";
import { Og } from "~lib/utils/enums";

import { Toaster } from "~components/ui/sonner";
import "./globals.css";
import Wrapper from "./wrapper";

const inter = Inter({ subsets: ["latin"] });

const { NEXT_PUBLIC_PRODUCTION_URL } = env;

const baseMetadata = {
  title: "Mijikai",
  description: "Mijikai is a free shorten URL Website. No ads, no tracker!",
  url: SITE_URL,
};

const { title, description, url } = baseMetadata;

export const metadata: Metadata = {
  title,
  description,
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: NEXT_PUBLIC_PRODUCTION_URL,
    images: [
      {
        url: Og.DEFAULT_OG_URL,
        alt: "OG Image",
      },
    ],
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={tw(inter.className)}>
        <Wrapper>{children}</Wrapper>
        <Toaster expand richColors />
      </body>
    </html>
  );
}
