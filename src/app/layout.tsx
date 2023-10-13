import { Inter } from "next/font/google";
import { tw } from "~lib/helpers";
import { DEFAULT_OG_URL, SITE_URL } from "~lib/utils/constants";

import "./globals.css";
import Wrapper from "./wrapper";

const inter = Inter({ subsets: ["latin"] });

const baseMetadata = {
  title: "Mijikai",
  description: "Mijikai is a free shorten URL Website. No ads, no tracker!",
  url: SITE_URL,
};

const { title, description, url } = baseMetadata;

export const metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: "mijikai.space",
    images: [
      {
        url: DEFAULT_OG_URL,
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

export default function RootLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Wrapper>
          <main
            className={tw(
              "w-full max-w-full flex justify-center",
              "items-center md:min-h-screen p-4"
            )}
          >
            {children}
          </main>
        </Wrapper>
      </body>
    </html>
  );
}
