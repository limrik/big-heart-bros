import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    /*CredentialsProvider({
			name: "Credentials",
			credentials : {
				username: {
					label: "Username:",
					type: "text",
					placeholder: "your-cool-username"
				},
				password: {
					label: "Password:",
					type: "password",
					placeholder: "your-password-pants"
				}
			},
			async authorize(credentials) { //can get data from database
				const user = { id: "42", name: "nigg", password: "nigg"} //https://next-auth.js.org/configuration/providers/credentials

				if (credentials?.username === user.name && credentials?.password === user.password) {
					return user
				} else {
					return null
				}
			}
		}) */
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }) as Adapter,
};
