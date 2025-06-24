import { Metadata } from "next";
import DashboardAdminLinksPage from "~components/dashboard/admin/links/links-page";
import { Og } from "~lib/utils/enums";

const title = "Links List | Mijikai";
const description =
  "Mijikai is a free shorten URL Website. No ads, no tracker!";
const url = "https://mijikai.ekel.dev/dashboard/admin/links";

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
    siteName: "mijikai.ekel.dev/dashboard/admin/links",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function DashboardAdminLinks() {
  return <DashboardAdminLinksPage />;
}
