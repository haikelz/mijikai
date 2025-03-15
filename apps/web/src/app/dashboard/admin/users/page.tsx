import { Metadata } from "next";
import DashboardAdminUsersPage from "~components/dashboard/users/users-page";
import { Og } from "~lib/utils/enums";

const title = "Users List | Mijikai";
const description =
  "Mijikai is a free shorten URL Website. No ads, no tracker!";
const url = "https://mijikai.ekel.dev/dashboard/admin/users";

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
    siteName: "mijikai.ekel.dev/dashboard/admin/users",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function DashboardAdminUsers() {
  return <DashboardAdminUsersPage />;
}
