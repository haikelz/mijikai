"use client";

import { Heading, Paragraph } from "~components/ui/typography";

export default function ErrorPage() {
  return (
    <div className="text-center">
      <Heading as="h2">500 Error!</Heading>
      <Paragraph>Sepertinya ada kesalahan di sisi server!</Paragraph>
    </div>
  );
}
