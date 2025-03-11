"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      data-cy="sign-out-button"
      className="font-bold underline underline-offset-2"
      type="button"
      aria-label="sign out"
      onClick={() => signOut()}
    >
      Click here.
    </button>
  );
}
