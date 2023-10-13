import { QRCodeSVG } from "qrcode.react";

import { Heading } from "./ui/typography";

export default function QrCode({ url }: { url: string }) {
  return (
    <div>
      <Heading as="h4">Scan me!</Heading>
      <QRCodeSVG value={url} className="mt-6" size={300} />
    </div>
  );
}