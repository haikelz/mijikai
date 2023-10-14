"use client";

import { Button } from "~components/ui/button";
import { db } from "~lib/utils/db";

export function DeleteLinkButton({ id }: { id: number }) {
  async function deleteLink(): Promise<void> {
    await db.from("shortened_url").delete().eq("id", id);
    window.location.reload();
  }

  return (
    <Button onClick={deleteLink} variant="destructive" className="font-bold">
      Delete
    </Button>
  );
}
