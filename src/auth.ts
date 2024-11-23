import {authConfig} from "./auth.config";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/UserSchema";

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
              
                  const user = await User.findOne({ email: credentials.email }).lean();
              
                  if (user) {              
                    const isMatch = await bcrypt.compare(credentials.password as string, user.password as string);
              
                    if (isMatch) {
                      return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.fName,
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
                  console.log("An error occurred: ", error);
                  return null;
                }
              },
        }),
    ],
});