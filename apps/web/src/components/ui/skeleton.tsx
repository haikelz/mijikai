import { tw } from "~lib/helpers";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={tw("bg-primary/10 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
