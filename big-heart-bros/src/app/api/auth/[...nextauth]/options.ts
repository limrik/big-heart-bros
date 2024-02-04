import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
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
			server: process.env.EMAIL_SERVER as string,
			from: process.env.EMAIL_FROM as string
		  }),
	],
	
	adapter: SupabaseAdapter({
		url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
	  }) as Adapter,
}