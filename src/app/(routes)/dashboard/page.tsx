"use client"
import { signOut } from "next-auth/react"

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="border border-foreground-muted px-md py-sm text-xs text-foreground-muted hover:border-foreground hover:text-foreground transition-colors"
      >
        Sign Out
      </button>
    </div>
  )
}