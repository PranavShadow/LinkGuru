// this page is solely for authentication of users signed in by google or by credentials provider and routing them to there places

import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/src/lib/supabase"
import bcrypt from "bcryptjs"
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}
const useSecureCookies = process.env.NODE_ENV === "production"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (!user) return null

        if (!user.email_verified) return null

        const passwordMatch = await bcrypt.compare(credentials.password, user.password_hash)
        if (!passwordMatch) return null

        return { id: user.id, email: user.email, name: user.name }
      },
    }),
    CredentialsProvider({
      id: "verify-token",
      name: "verify-token",
      credentials: { token: { label: "token", type: "text" } },
      async authorize(credentials) {
        if (!credentials?.token) return null

        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("login_token", credentials.token)
          .single()

        if (!user) return null
        if (new Date(user.login_token_expires) < new Date()) return null // expired

        // one-time use — clear it immediately
        await supabase
          .from("users")
          .update({ login_token: null, login_token_expires: null })
          .eq("id", user.id)

        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { data: existing } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email!)
          .single()

        if (!existing) {
          await supabase.from("users").insert({
            email: user.email,
            name: user.name,
            provider: "google",
          })
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        // Fetch the actual Supabase user id using email
        const { data: user, error } = await supabase
          .from("users")
          .select("id")
          .eq("email", token.email!)
          .single()

        session.user.id = user?.id ?? token.sub!
      }
      return session
    },
  },
  cookies: {
    pkceCodeVerifier: {
      name: useSecureCookies
        ? "__Secure-next-auth.pkce.code_verifier"
        : "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? "none" : "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    state: {
      name: useSecureCookies ? "__Secure-next-auth.state" : "next-auth.state",
      options: {
        httpOnly: true,
        sameSite: useSecureCookies ? "none" : "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
  useSecureCookies,
  pages: { signIn: "/" },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }