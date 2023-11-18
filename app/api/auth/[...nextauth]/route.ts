import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client";

interface dbUser {
  id: string;
  email: string;
  emailVerified: Date | null;
  username: string;
  name: string | null;
  bio: string | null;
  image: string | null;
  registeredAt: Date;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    session: async (session: any) => {
      const dbUser: dbUser | null = await prisma.user.findUnique({
        where: {
          email: session.session.user.email
        }
      })
      if (dbUser) {
        session.session.user.id = dbUser.id
        session.session.user.username = dbUser.username
      }
      return session
    }
  },
  session: {
    strategy: 'jwt'
  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}