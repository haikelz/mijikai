"use client";

import { ArrowUpIcon } from "lucide-react";

import { useScroll } from "~hooks/use-scroll";
import { Button } from "../ui/button";

export function BackToTop() {
  const scroll = useScroll();

  return (
    <>
      {scroll > 150 ? (
        <Button
          type="button"
          aria-label="back to top button"
          data-cy="back-to-top-button"
          variant="secondary"
          className="fixed right-4 bottom-4"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpIcon size={20} />
        </Button>
      ) : null}
    </>
  );
}
