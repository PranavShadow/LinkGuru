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
  from: "LinkGuru <verify@linkguru.pranavgg.me>",
  to: email,
  subject: "Verify your LinkGuru account",
  html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Verify Email</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:Inter,Segoe UI,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#171717;border:1px solid #2a2a2a;border-radius:16px;overflow:hidden;">

<tr>
<td align="center" style="padding:50px 40px 30px;">

<div style="margin-bottom:24px;">
  <img
    src="https://linkguru.pranavgg.me/favicon.ico"
    alt="LinkGuru"
    width="70"
    height="70"
    style="
      display:block;
      border-radius:18px;
      background:#ffffff;
      padding:12px;
      margin:auto;
    "
  />
</div>

<h1 style="
margin:0;
color:#ffffff;
font-size:34px;
font-weight:700;">
LinkGuru
</h1>

<p style="
margin:10px 0 0;
color:#8b8b8b;
font-size:15px;">
Save. Organize. Find.
</p>

</td>
</tr>

<tr>
<td style="padding:0 50px 10px;">

<h2 style="
margin:0 0 16px;
color:#ffffff;
font-size:26px;">
Verify your email
</h2>

<p style="
margin:0;
font-size:16px;
line-height:28px;
color:#d1d1d1;">
Hi <strong>${name}</strong>,
</p>

<p style="
margin:18px 0 0;
font-size:16px;
line-height:28px;
color:#d1d1d1;">
Thanks for signing up for LinkGuru.
Click the button below to verify your email address and activate your account.
</p>

</td>
</tr>

<tr>
<td align="center" style="padding:40px;">

<a
href="${process.env.NEXTAUTH_URL}/api/auth/verify?token=${verification_token}"
style="
background:#ffffff;
color:#111111;
text-decoration:none;
padding:16px 36px;
border-radius:10px;
font-weight:700;
font-size:16px;
display:inline-block;">
Verify Email
</a>

</td>
</tr>

<tr>
<td style="padding:0 50px 35px;">

<div style="
background:#111111;
border:1px solid #2a2a2a;
border-radius:12px;
padding:18px;">

<p style="
margin:0;
font-size:14px;
line-height:24px;
color:#9e9e9e;">
This verification link will expire after <strong style="color:#ffffff;">24 hours</strong>.
If you didn't create a LinkGuru account, you can safely ignore this email.
</p>

</div>

</td>
</tr>

<tr>
<td style="
padding:30px;
border-top:1px solid #2a2a2a;
text-align:center;">

<p style="
margin:0;
font-size:13px;
color:#6f6f6f;">
© ${new Date().getFullYear()} LinkGuru. All rights reserved.
</p>

<p style="
margin-top:10px;
font-size:12px;
color:#555555;">
Built for people who never want to lose a link again.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
})

  if (sendError) {
    console.error("Resend error:", sendError)
    return { error: "Failed to send verification email" }
  }
  return { success: true, message: "Check your email to verify your account" }
}