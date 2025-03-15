import { Metadata } from "next";
import DashboardAdminPage from "~components/dashboard/dashboard-admin-page";
import { Og } from "~lib/utils/enums";

const title = "Dashboard Admin | Mijikai";
const description =
  "Mijikai is a free shorten URL Website. No ads, no tracker!";
const url = "https://mijikai.ekel.dev/dashboard/admin";

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
    siteName: "mijikai.ekel.dev/dashboard/admin",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function DashboardAdmin() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DashboardAdminPage />
    </div>
  );
}
