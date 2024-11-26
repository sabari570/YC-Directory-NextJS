import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // This callback is executed when you click on the signIn button, that is when you sign in using google
    async signIn({ user: { id, name, email, image }, account, profile }) {
      if (!email || !name) return false;
      const existingUser = await prisma.author.findUnique({
        where: {
          email,
        },
      });

      if (!existingUser) {
        await prisma.author.create({
          data: {
            name,
            email,
            image,
          },
        });
      }
      return true;
    },

    // This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
    // Anything you return here will be saved in the JWT and forwarded to the session callback.
    // There you can control what should be returned to the client.
    async jwt({ token, account, profile }) {
      if (account && profile && profile?.email) {
        const user = await prisma.author.findUnique({
          where: {
            email: profile.email,
          },
        });

        token.id = user?.id;
      }
      return token;
    },

    // This function will be executed whenever you need access the session data using the auth() function
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
