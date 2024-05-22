import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto"

const emailAdmin = process.env.NEXT_SECRET_EMAIL;
const passwordAdmin = process.env.NEXT_SECRET_PASSWORD;

const secretbyte = crypto.randomBytes(64).toString('hex');
const user: any = {
  id: 1,
  name: "fajri hidayat",
  email: "fajrihidayat@gmail.com",
  role: "admin",
};


const authOptions :  NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: secretbyte,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        
        if (email == emailAdmin  && password == passwordAdmin) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
