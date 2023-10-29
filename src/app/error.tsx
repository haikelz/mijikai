"use client";

import { Heading, Paragraph } from "~components/ui/typography";
import { tw } from "~lib/helpers";

export default function ErrorPage() {
  return (
    <main
      className={tw(
        "w-full max-w-full min-h-screen flex justify-center",
        "items-center p-4"
      )}
    >
      <section className="max-w-xl w-full flex flex-col justify-center items-center">
        <div className="text-center">
          <Heading as="h2">500 Error!</Heading>
          <Paragraph>There are something wrong in the server side!</Paragraph>
        </div>
      </section>
    </main>
  );
}
