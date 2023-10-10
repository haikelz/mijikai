import { Heading, Paragraph } from "~components/ui/typography";

export default function NotFound() {
  return (
    <div className="text-center">
      <Heading as="h2">404 Not Found!</Heading>
      <Paragraph>Maaf, halaman yang anda tuju tidak ditemukan.</Paragraph>
    </div>
  );
}
