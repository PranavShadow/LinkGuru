"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [token, setToken] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get("token")
    if (!t) router.replace("/")
    else setToken(t)
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (password !== confirm) return setError("Passwords don't match")
    if (password.length < 6) return setError("Password must be at least 6 characters")
    setLoading(true)
    const res = await fetch("/api/auth/reset/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (data.error) setError(data.error)
    else setSuccess(true)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-background text-foreground">
      <div className="flex flex-col gap-lg w-[400px]">

        <h1 className="text-xl font-bold tracking-widest">LinkGuru</h1>

        {success ? (
          <div className="flex flex-col gap-md">
            <h2 className="text-3xl font-bold">Password updated</h2>
            <p className="text-sm text-foreground-muted">Your password has been reset successfully.</p>
            <button
              onClick={() => router.push("/")}
              className="w-full border border-foreground p-2 text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-lg">
            <h2 className="text-3xl font-bold">Reset Password</h2>
            <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-xs">
                <label className="text-foreground-muted text-xs font-bold">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full border border-foreground-muted p-2 outline-0 bg-transparent"
                  required
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-foreground-muted text-xs font-bold">Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full border border-foreground-muted p-2 outline-0 bg-transparent"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full border border-foreground p-2 text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
              >
                {loading ? "Updating..." : "Set New Password"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="w-full border border-foreground-muted p-2 text-foreground-muted hover:text-foreground transition-colors"
              >
                Back to Login
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}