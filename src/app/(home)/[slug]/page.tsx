import { redirect } from "next/navigation";

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

export default function SlugPage() {
  /**
   * Redirect user to home when the slug and shortened_url from supabase are not matched
   */
  return redirect("/");
}
