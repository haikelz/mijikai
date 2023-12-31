import { ChildrenProps } from "@types";
import { HTMLAttributes } from "react";
import { tw } from "~lib/helpers";

type HeadingProps = ChildrenProps & {
  as: "h1" | "h2" | "h3" | "h4";
} & HTMLAttributes<HTMLHeadingElement>;

export function Heading({ className, children, as, ...props }: HeadingProps) {
  return (
    <>
      {as === "h1" ? (
        <h1
          className={tw(
            "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
            className
          )}
          {...props}
        >
          {children}
        </h1>
      ) : as === "h2" ? (
        <h2
          className={tw(
            "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
            className
          )}
          {...props}
        >
          {children}
        </h2>
      ) : as === "h3" ? (
        <h3
          className={tw(
            "scroll-m-20 text-2xl font-semibold tracking-tight",
            className
          )}
          {...props}
        >
          {children}
        </h3>
      ) : as === "h4" ? (
        <h4
          className={tw(
            "scroll-m-20 text-xl font-semibold tracking-tight",
            className
          )}
          {...props}
        >
          {children}
        </h4>
      ) : null}
    </>
  );
}
