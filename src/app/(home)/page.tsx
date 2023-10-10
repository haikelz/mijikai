import { Heading, Paragraph } from "~components/ui/typography";
import { db } from "~lib/utils/db";
import { ShortenedUrlProps } from "~types";

import HomeClient from "./client";

type GetDataProps = {
  id: string;
};

async function getData(): Promise<GetDataProps[]> {
  const { data, error } = await db.from("shortened_url").select("id");

  if (error) throw error;
  return data;
}

export default async function Home() {
  const listShortenedUrl = await getData();

  return (
    <section className="max-w-xl w-full flex flex-col justify-center items-center">
      <div>
        <Heading as="h1">Mijikai / 短い</Heading>
        <Paragraph>
          Mijikai is a free shorten URL Website. No ads, no tracker! There is{" "}
          {listShortenedUrl.length} link that shortened in here.
        </Paragraph>
        <HomeClient />
      </div>
    </section>
  );
}
