// this page is solely for authentication of users signed in by google or by credentials provider and routing them to there places

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/src/lib/supabase"
import bcrypt from "bcryptjs";
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

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "email", type: "email"},
                password: {label: "password", type: "password"},
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password) return null;
            
                const {data:user} = await supabase.from("users")
                .select("*")
                .eq("email", credentials.email)
                .single()

                if(!user) return null

                const passwordMatch = await bcrypt.compare(credentials.password, user.password_hash)
                if(!passwordMatch) return null;

                return{id: user.id, email: user.email, name: user.name}
            }
        })
    ],
    callbacks: {
        async signIn({user, account}){
            if(account?.provider === "google"){
                const {data:existing} = await supabase.from("users")
                .select("id")
                .eq("email", user.email)
                .single()

                if(!existing){
                    await supabase.from("users")
                    .insert({
                        email: user.email,
                        name: user.name,
                        provider: "google",
                    })
                }
            }
            return true
        },

        async session({session, token}){
            if(session.user){
                session.user.id = token.sub!
            }
            return session
        }
    },
    pages: {
        signIn: "/",
    },
})

export {handler as GET, handler as POST}