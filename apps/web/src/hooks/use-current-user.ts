import { User } from "next-auth";
import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { data: session } = useSession();
  return session?.user as User;
}
