import { Metadata } from "next";
import { redirect } from "next/navigation";
import { DEFAULT_OG_URL } from "~lib/utils/constants";
import { db } from "~lib/utils/db";
import { ShortenedUrlProps } from "~types";

type SlugProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(
  { params: { slug } }: SlugProps
): Promise<{ slug: string }[]> {
  return [{ slug }];
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata | undefined> {
  const { slug } = params;

  const { data, error } = await db
    .from("shortened_url")
    .select()
    .eq("shortened_url", `https://mijikai.space/${slug}`);
  if (error) throw error;

  const { original_url, shortened_url } = data[0] as ShortenedUrlProps;

  const baseMetadata = {
    title: `Shortened link for ${original_url}`,
    description: `Shortened link for ${original_url}`,
  };

  const { title, description } = baseMetadata;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: shortened_url,
      title,
      description,
      siteName: shortened_url,
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
      site: shortened_url,
      card: "summary_large_image",
    },
    metadataBase: new URL(shortened_url),
  };
}

type GetShortenedUrlProps = {
  shortened_url: string;
  original_url: string;
};

async function getShortenedUrl(slug: string): Promise<GetShortenedUrlProps[]> {
  const { data, error } = await db
    .from("shortened_url")
    .select()
    .eq("shortened_url", `https://mijikai.space/${slug}`);

  if (error) throw error;
  return data;
}

export default async function RedirectPage({ params }: SlugProps) {
  const { slug } = params;
  const shortenedUrl = await getShortenedUrl(slug);

  if (shortenedUrl.length) return redirect(shortenedUrl[0].original_url);
  return redirect("/");
}
