import { ChildrenProps } from "@types";
import { tw } from "~lib/helpers";

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
