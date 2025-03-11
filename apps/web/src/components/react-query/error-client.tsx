import { Heading, Paragraph } from "~components/ui/typography";

export function ErrorClient() {
  return (
    <div className="w-full text-left mt-2">
      <Heading as="h2">Error!</Heading>
      <Paragraph className="font-bold text-xl">
        Sepertinya ada kesalahan di sisi server. Mohon coba lagi!{" "}
      </Paragraph>
    </div>
  );
}
