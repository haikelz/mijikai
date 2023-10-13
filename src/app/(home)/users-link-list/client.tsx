"use client";

import { useRouter } from "next/navigation";
import { Button } from "~components/ui/button";
import { Paragraph } from "~components/ui/typography";
import { db } from "~lib/utils/db";

export function DeleteLinkButton({ id }: { id: number }) {
  async function deleteLink() {
    await db.from("shortened_url").delete().eq("id", id);
    window.location.reload();
  }

  return (
    <Button onClick={deleteLink} variant="destructive" className="font-bold">
      Delete
    </Button>
  );
}

export function BackToHomeButton() {
  const router = useRouter();

  return (
    <Paragraph
      className="font-bold underline underline-offset-2 cursor-pointer"
      onClick={() => router.push("/")}
    >
      Back
    </Paragraph>
  );
}
