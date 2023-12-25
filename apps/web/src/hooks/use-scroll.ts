"use client";

import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { scrollAtom } from "~store";

/**
 * A custom hook to detect browser height based on user's scroll
 * @returns {number} scroll - scroll value
 */
export function useScroll(): number {
  const [scroll, setScroll] = useAtom(scrollAtom);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScroll(position);
  }, [setScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scroll;
}
