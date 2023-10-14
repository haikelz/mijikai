import { redirect } from "next/navigation";
import { db } from "~lib/utils/db";

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

  if (shortenedUrl) return redirect(shortenedUrl[0].original_url);
  return redirect("/");
}
