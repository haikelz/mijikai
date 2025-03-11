import { ChildrenProps } from "@types";
import { HTMLAttributes } from "react";
import { tw } from "~lib/helpers";

type ParagraphProps = HTMLAttributes<HTMLParagraphElement> & ChildrenProps;

export function Paragraph({ children, className, ...props }: ParagraphProps) {
  return (
    <p className={tw("leading-7 not-first:mt-6", className)} {...props}>
      {children}
    </p>
  );
}
