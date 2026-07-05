"use client"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { APPS } from "@/src/lib/apps"


export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeApps, setActiveApps] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/")
  }, [status, router])

  useEffect(() => {
    if (status !== "authenticated") return
    fetch("/api/links")
      .then(r => r.json())
      .then(({ links }) => {
        // Build a set of app ids that have at least one link
        const apps = new Set<string>(links.map((l: { app: string }) => l.app))
        setActiveApps(apps)
        setLoading(false)
      })
  }, [status])

  if (status === "loading" || !session) return null

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">

      {/* Header */}
      <header className="flex items-center justify-between px-xl py-md border-b border-border">
        <h1 className="text-xl font-bold">LinkGuru</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-xs text-foreground-muted hover:text-foreground transition-colors tracking-widest "
        >
          Log Out
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-y-auto px-xl py-xl">

        {/* Add link input */}
        <div className="flex items-center gap-sm border border-border px-md py-sm mb-xl mx-auto w-[700px]">
          <span className="text-foreground-muted text-xs">⌘</span>
          <input
            type="text"
            placeholder="Paste a link..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground-muted"
            onKeyDown={async (e) => {
              if (e.key !== "Enter") return
              const url = (e.target as HTMLInputElement).value.trim()
              if (!url) return
              const res = await fetch("/api/links", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
              })
              const data = await res.json()
              if (data.success) {
                setActiveApps(prev => new Set([...prev, data.app]));
                (e.target as HTMLInputElement).value = ""
              }
            }}
          />
        </div>

        {/* App grid */}
        {loading ? (
          <p className="text-foreground-muted text-xs text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-px border border-border">
            {[...APPS]
              .sort((a, b) => {
                const aActive = activeApps.has(a.id) ? 0 : 1
                const bActive = activeApps.has(b.id) ? 0 : 1
                return aActive - bActive
              })
              .map((app) => {
                const isActive = activeApps.has(app.id)
                const Icon = app.icon
                return (
                  <Link
                    key={app.id}
                    href={`/dashboard/${app.id}`}
                    className="flex flex-col items-center justify-center gap-xs py-lg px-sm border border-border hover:bg-surface transition-colors group"
                  >
                    <Icon
                      size={20}
                      color={isActive ? app.color : "var(--color-foreground-muted)" }
                      className={isActive ? "" : "text-foreground-muted"}
                    />
                    <span
                      className="text-[10px] tracking-wide"
                      style={{ color: isActive ? app.color : undefined }}
                    >
                      {isActive
                        ? <span>{app.label}</span>
                        : <span className="text-foreground-muted">{app.label}</span>
                      }
                    </span>
                  </Link>
                )
              })
            }
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between px-xl py-sm border-t border-border">
        <span className="text-[10px] text-foreground-muted tracking-widest"><a target="_blank" className="hover:text-foreground" href="https://github.com/PranavShadow/LinkGuru">LinkGuru</a></span>
        <div className="flex gap-md">
          <span className="text-[10px] text-foreground-muted hover:text-foreground cursor-pointer">Privacy</span>
          <span className="text-[10px] text-foreground-muted hover:text-foreground cursor-pointer">Terms</span>
          <span className="text-[10px] text-foreground-muted hover:text-foreground cursor-pointer">Support</span>
        </div>
        <span className="text-[10px] text-foreground-muted">View more such projects at <a target="_blank" href="https://github.com/PranavShadow"><span className="hover:text-foreground">github.com/PranavShadow</span></a></span>
      </footer>

    </div>
  )
}