import { Awaitable, NextAuthOptions, User } from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { env } from "~env.mjs";

const {
  NEXT_PUBLIC_GITHUB_SECRET,
  NEXT_PUBLIC_GITHUB_ID,
  NEXT_PUBLIC_GOOGLE_ID,
  NEXT_PUBLIC_GOOGLE_SECRET,
  NEXTAUTH_SECRET,
} = env;

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile): Awaitable<User> {
        return {
          ...profile,
          id: profile.id.toString(),
          email: profile.email,
          name: profile.name,
          image: profile.avatar_url,
          login: profile.login,
        };
      },
      clientId: NEXT_PUBLIC_GITHUB_ID,
      clientSecret: NEXT_PUBLIC_GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile): Awaitable<User> {
        return {
          ...profile,
          id: profile.sub,
          email: profile.email,
          image: profile.picture,
          name: profile.name,
        };
      },
      clientId: NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],
  theme: { colorScheme: "auto" },
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
