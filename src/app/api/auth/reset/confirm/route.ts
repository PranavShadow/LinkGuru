import { supabase } from "@/src/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const { token, password } = await req.json()
  if (!token || !password) return Response.json({ error: "Missing fields" }, { status: 400 })

  const { data: user } = await supabase
    .from("users")
    .select("id, reset_token_expires")
    .eq("reset_token", token)
    .single()

  if (!user) return Response.json({ error: "Invalid or expired token" }, { status: 400 })

  // Check expiry
  const expires = new Date(user.reset_token_expires + "Z")  // force UTC
    if (expires < new Date()) {
    return Response.json({ error: "Reset link has expired" }, { status: 400 })
    }

  const password_hash = await bcrypt.hash(password, 10)

  await supabase
    .from("users")
    .update({ password_hash, reset_token: null, reset_token_expires: null })
    .eq("id", user.id)

  return Response.json({ success: true })
}