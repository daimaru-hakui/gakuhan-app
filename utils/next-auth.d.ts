import NextAuth, { DefaultSession } from "next-auth";
import { jwt } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
      emailVerified?: boolean;
      role: string;
      displayName?:string
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    emailVerified: boolean;
    role: string;
    displayName?:string
  }
}