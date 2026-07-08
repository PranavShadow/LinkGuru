// this page is solely for registering new users by credentials
"use server"
import { supabase } from "./supabase";
import bcrypt from "bcryptjs";
import { Resend } from "resend"
import { randomUUID } from "crypto"


const resend = new Resend(process.env.RESEND_API_KEY)

export async function signUpUser(name: string, email: string, password: string) {
  const { data: existing } = await supabase.from("users")
    .select("id")
    .eq("email", email)
    .single()

  if (existing)
    return { error: "User Already exists" }

  const password_hash = await bcrypt.hash(password, 10);
  const verification_token = randomUUID()

  const { error } = await supabase.from("users")
    .insert({
      name,
      email,
      password_hash,
      provider: "credentials",
      email_verified: false,
      verification_token,
    })

  if (error) return { error: error.message }

  const { data, error: sendError } = await resend.emails.send({
    from: "LinkGuru <onboarding@resend.dev>",
    to: email,
    subject: "Verify your LinkGuru account",
    html: `
      <div style="font-family: sans-serif; background: #131313; color: #ffffff; padding: 40px;">
        <h1 style="font-size: 24px;">LinkGuru</h1>
        <p>Hi ${name}, verify your email to activate your account.</p>
        <a href="${process.env.NEXTAUTH_URL}/api/auth/verify?token=${verification_token}"
           style="display:inline-block; margin-top:20px; padding: 12px 24px; background:#ffffff; color:#131313; font-weight:bold; text-decoration:none;">
          Verify Email
        </a>
        <p style="margin-top:20px; color:#6b6b6b; font-size:12px;">
          If you didn't create an account, ignore this email.
        </p>
      </div>
    `,
  })

  if (sendError) {
    console.error("Resend error:", sendError)
    return { error: "Failed to send verification email" }
  }
  return { success: true, message: "Check your email to verify your account" }
}