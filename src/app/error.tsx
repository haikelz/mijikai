"use client";

import { Heading, Paragraph } from "~components/ui/typography";

export default function ErrorPage() {
  return (
    <div>
      <Heading as="h2">500 Error!</Heading>
      <Paragraph className="mt-1">Sepertinya ada kesalahan di sisi server!</Paragraph>
    </div>
  );
}
