import { QRCodeSVG } from "qrcode.react";

import { Heading } from "./ui/typography";

export default function QrCode({ url }: { url: string }) {
  return (
    <div className="mt-10">
      <Heading as="h4">Qr Code</Heading>
      <QRCodeSVG value={url} className="mt-6" size={300} />
    </div>
  );
}
