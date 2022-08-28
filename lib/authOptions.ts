import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "models/UserModel";
import connectdb from "./connectdb";

if (!process.env.GOOGLE_OAUTH_CLIENT_ID) {
  throw new Error(
    "Cannot authenticate: GOOGLE_OAUTH_CLIENT_ID environment variable must be set"
  );
}

if (!process.env.GOOGLE_OAUTH_CLIENT_SECRET) {
  throw new Error(
    "Cannot authenticate: GOOGLE_OAUTH_CLIENT_SECRET environment variable must be set"
  );
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
  debug: false,
  callbacks: {
    async jwt({ token, user: googleUser, account }) {
      // Evaluates to false on initial login only
      if (!googleUser || !account) {
        // Return existing token
        return token;
      }

      // Update local user data
      await connectdb();
      const localUser = await UserModel.findOneAndUpdate(
        { googleId: googleUser.id },
        {
          name: googleUser.name,
          email: googleUser.email,
          image: googleUser.image,
        },
        { upsert: true, new: true }
      )
        .lean()
        .exec();

      // Create a new token
      return {
        sub: localUser._id.toString(),
        name: localUser.name,
        image: localUser.image,
        role: localUser.role,
      };
    },
    session({ session, token }) {
      // Attach additional fields to session
      return {
        ...session,
        user: {
          name: session.user.name,
          image: session.user.image,
          id: token.sub,
          role: token.role,
        },
      };
    },
  },
};

export default authOptions;
