import { Heading, Paragraph } from "~components/ui/typography";

export default function NotFound() {
  return (
    <div>
      <div>
        <Heading as="h2">404 Not Found!</Heading>
        <Paragraph>Maaf, halaman yang anda tuju tidak ditemukan.</Paragraph>
      </div>
    </div>
  );
}
