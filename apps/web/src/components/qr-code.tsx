import { QRCodeSVG } from "qrcode.react";

import { Modal } from "./ui/modal";
import { Heading } from "./ui/typography";

export default function QrCode({ url }: { url: string }) {
  return (
    <Modal>
      <div>
        <Heading as="h4">Scan me!</Heading>
        <QRCodeSVG value={url} className="mt-6" size={300} />
      </div>
    </Modal>
  );
}
