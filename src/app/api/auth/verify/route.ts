import { supabase } from "@/src/lib/supabase"
import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(new URL("/?error=invalid_token", req.url))
  }

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("verification_token", token)
    .single()

  if (!user) {
    return NextResponse.redirect(new URL("/?verified=maybe", req.url))
  }

  const login_token = randomUUID()
  const login_token_expires = new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 min

  await supabase
    .from("users")
    .update({
      email_verified: true,
      verification_token: null,
      login_token,
      login_token_expires,
    })
    .eq("id", user.id)

  return NextResponse.redirect(new URL(`/?login_token=${login_token}`, req.url))
}