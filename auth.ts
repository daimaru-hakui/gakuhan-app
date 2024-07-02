import NextAuth from "next-auth";
import { auth as firebaseAuth } from './lib/firebase/server';
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {},
      authorize: async (credentials: any) => {
        let user = null;
        const idToken = credentials.token;
        const decoded = await firebaseAuth.verifyIdToken(idToken);
        user = {
          ...decoded,
          uid: decoded.uid
        };
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60
  },
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.uid = token.uid;
      return session;
    }
  }
});