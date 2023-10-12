import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";

export default function DaftarLink() {
  const session = getServerSession(options);

  if (!session) return redirect("/sign-in");

  return (
    <div>
      <div></div>
    </div>
  );
}
