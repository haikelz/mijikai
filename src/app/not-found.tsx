import { Heading, Paragraph } from "~components/ui/typography";
import { tw } from "~lib/helpers";

export default function NotFound() {
  return (
    <main
      className={tw(
        "w-full max-w-full min-h-screen flex justify-center",
        "items-center p-4"
      )}
    >
      <section className="max-w-xl w-full flex flex-col justify-center items-center">
        <div className="text-center">
          <Heading as="h2">404 Not Found!</Heading>
          <Paragraph>Maaf, halaman yang anda tuju tidak ditemukan.</Paragraph>
        </div>
      </section>
    </main>
  );
}
