import { Metadata } from "next";
import FormLoginAdmin from "~components/auth/form-login-admin";
import { Og } from "~lib/utils/enums";

const title = "Login Admin | Mijikai";
const description =
  "Mijikai is a free shorten URL Website. No ads, no tracker!";
const url = "https://mijikai.ekel.dev/auth/login-admin";

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
    siteName: "mijikai.ekel.dev/auth/login-admin",
  },
  twitter: {
    title,
    description,
    site: url,
    card: "summary_large_image",
  },
  metadataBase: new URL(url),
};

export default function LoginAdmin() {
  return (
    <main className="min-h-svh flex justify-center items-center w-full mx-auto">
      <section className="min-h-svh flex justify-center items-center p-4 w-full max-w-xl">
        <FormLoginAdmin />
      </section>
    </main>
  );
}
