import { tw } from "~lib/helpers";
import { ChildrenProps } from "~types";

export default function UsersLinkListLayout({ children }: ChildrenProps) {
  return (
    <main
      className={tw(
        "w-full max-w-full flex justify-center",
        "items-center p-4"
      )}
    >
      {children}
    </main>
  );
}
