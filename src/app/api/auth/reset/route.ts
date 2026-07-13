import { supabase } from "@/src/lib/supabase"
import { Resend } from "resend"
import { randomUUID } from "crypto"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const { email } = await req.json()
    if (!email) return Response.json({ error: "Email required" }, { status: 400 })

    const { data: user } = await supabase
        .from("users")
        .select("id, name, provider")
        .eq("email", email)
        .single()

    // Don't reveal if user exists or not
    if (!user) return Response.json({ success: true })

    // Block Google users from resetting password
    if (user.provider === "google") {
        return Response.json({ error: "This account uses Google login. No password to reset." }, { status: 400 })
    }

    const reset_token = randomUUID()
    const reset_token_expires = new Date(Date.now() + 1000 * 60 * 30) // 30 min expiry

    await supabase
        .from("users")
        .update({ reset_token, reset_token_expires })
        .eq("id", user.id)

    await resend.emails.send({
        from: "LinkGuru <verify@linkguru.pranavgg.me>",
        to: email,
        subject: "Reset your LinkGuru password",
        html: `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <title>Reset Password</title>
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
            width="72"
            height="72"
            style="display:block;margin:auto;border-radius:18px;"
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
        <td style="padding:0 50px;">

        <h2 style="
        margin:0 0 18px;
        color:#ffffff;
        font-size:28px;">
        Reset your password
        </h2>

        <p style="
        margin:0;
        color:#d1d1d1;
        font-size:16px;
        line-height:28px;">
        Hi <strong>${user.name}</strong>,
        </p>

        <p style="
        margin-top:18px;
        color:#d1d1d1;
        font-size:16px;
        line-height:28px;">
        We received a request to reset your LinkGuru password.
        Click the button below to create a new password.
        </p>

        </td>
        </tr>

        <tr>
        <td align="center" style="padding:40px;">

        <a
        href="${process.env.NEXTAUTH_URL}/reset-password?token=${reset_token}"
        style="
        display:inline-block;
        background:#ffffff;
        color:#111111;
        text-decoration:none;
        padding:16px 36px;
        border-radius:10px;
        font-weight:700;
        font-size:16px;">
        Reset Password
        </a>

        </td>
        </tr>

        <tr>
        <td style="padding:0 50px 35px;">

        <div style="
        background:#111111;
        border:1px solid #2a2a2a;
        border-radius:12px;
        padding:20px;">

        <p style="
        margin:0;
        font-size:14px;
        line-height:24px;
        color:#b0b0b0;">
        <b style="color:#ffffff;">Security Notice</b><br><br>
        • This password reset link expires in <strong style="color:#ffffff;">30 minutes</strong>.<br>
        • This link can only be used once.<br>
        • If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
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
        Helping you organize your links, one bookmark at a time.
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

    return Response.json({ success: true })
}