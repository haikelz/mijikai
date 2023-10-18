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

export default async function RedirectPage() {
  return;
}
