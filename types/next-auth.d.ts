import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    session: {
      user: {
        /** The user's name. */
        username: string,
        image: string,
        id: string
      }
    }
  }
}