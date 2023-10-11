import { Heading, Paragraph } from "~components/ui/typography";
import { db } from "~lib/utils/db";

import HomeClient from "./client";

async function getTotal(): Promise<number> {
  const { count, error } = await db
    .from("shortened_url")
    .select("id", { count: "exact", head: true });

  if (error) throw error;
  return count as number;
}

export default async function Home() {
  const totalShortenedUrl = await getTotal();

  return (
    <section className="max-w-xl w-full flex flex-col justify-center items-center">
      <div>
        <Heading as="h1">Mijikai / 短い</Heading>
        <Paragraph>
          Mijikai is a free shorten URL Website. <b>No ads, no tracker!</b>{" "}
          There are <b className="font-bold">{totalShortenedUrl} link</b> that
          already shortened using this service.
        </Paragraph>
        <HomeClient />
      </div>
    </section>
  );
}
