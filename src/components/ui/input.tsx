"use client";

import { forwardRef } from "react";
import { tw } from "~lib/helpers";

import { Paragraph } from "./typography";

export const Input = forwardRef<HTMLInputElement>((props, ref) => {
  return (
    <div className="flex justify-center items-center">
      <div className="px-3 py-2 rounded-l-md bg-gray-300">
        <Paragraph className="font-bold">https://</Paragraph>
      </div>
      <input
        ref={ref}
        type="text"
        className={tw(
          "flex w-full rounded-r-md h-11 border border-input font-medium",
          "bg-background px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground   focus-visible:outline-none",
          "focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";
