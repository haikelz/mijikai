import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      login: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: string;
    login?: string;
  }

  declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
      id: string;
      login?: string;
    }
  }
}
