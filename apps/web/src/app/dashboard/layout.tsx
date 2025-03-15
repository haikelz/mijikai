import { ChildrenProps } from "@types";
import { Metadata } from "next";
import { DashboardSidebar } from "~components/dashboard/sidebar";
import { SITE_URL } from "~lib/utils/constants";
import { Og } from "~lib/utils/enums";

const title = "Mijikai";
const description =
  "Mijikai is a free shorten URL Website. No ads, no tracker!";
const url = SITE_URL;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    title,
    description,
    images: [
      {
        url: Og.DEFAULT_OG_URL,
        alt: "OG Image",
      },
    ],
    siteName: "mijikai.ekel.dev",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function Layout({ children }: ChildrenProps) {
  return (
    <>
      <DashboardSidebar>{children}</DashboardSidebar>
    </>
  );
}
