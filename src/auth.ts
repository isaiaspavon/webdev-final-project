import {authConfig} from "./auth.config";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/UserSchema";
import connectMongoDB from "./libs/mongodb";

export const{
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials:{
                email: {},
                password: {},
            },

            async authorize(credentials) {
              
                if (!credentials) return null;
                try {
                  console.log("Attempting to find user...");
                    await connectMongoDB();
              
                  const user = await User.findOne({ email: credentials.email }).lean();
              
                  if (user) {              
                    const isMatch = await bcrypt.compare(credentials.password as string, user.password as string);
              
                    if (isMatch) {
                      return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.fName,
                        gender: user.gender,
                      };

                    } else {
                      console.log("Email or Password is not correct");
                      return null;
                    }
                  } else {
                    console.log("User not found");
                    return null;
                  }
                } catch (error: any) {
                  return null;
                }
              },
        }),
    ],

    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        // Add user data to the token when available
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        // Attach token data to the session
        session.user.id = token.id as string;
        return session;
      },
    },

});