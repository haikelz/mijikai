import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "~app/api/auth/[...nextauth]/options";

import LoginClient from "./client";

export default async function SignInPage() {
  const session = await getServerSession(options);

  if (session) return redirect("/");

  return (
    <div>
      <LoginClient />
    </div>
  );
}
