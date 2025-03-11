import { ChildrenProps } from "@types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";
import { tw } from "~lib/helpers";

export default async function UsersLinkListLayout({ children }: ChildrenProps) {
  const session = await getServerSession(options);

  if (!session) {
    return redirect("/");
  }

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
