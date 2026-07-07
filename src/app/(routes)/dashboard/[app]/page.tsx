"use client"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { APPS } from "@/src/lib/apps"

interface LinkItem {
  id: string
  url: string
  title: string | null
  description: string | null
  image: string | null
  favicon: string | null
  created_at: string
}

export default function AppLinksPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const appId = params.app as string

  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState("")

  const appInfo = APPS.find(a => a.id === appId)

  const filteredLinks = links.filter(link => {
    if (!input.trim()) return true
    const q = input.toLowerCase()
    return (
      link.title?.toLowerCase().includes(q) ||
      link.url?.toLowerCase().includes(q) ||
      link.description?.toLowerCase().includes(q)
    )
  })

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/")
  }, [status, router])

  useEffect(() => {
    if (status !== "authenticated") return
    fetch(`/api/links?app=${appId}`)
      .then(r => r.json())
      .then(({ links }) => {
        setLinks(links ?? [])
        setLoading(false)
      })
  }, [status, appId])

  async function handleAdd(url: string) {
    if (!url.trim()) return
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    if (data.success) {
      fetch(`/api/links?app=${appId}`)
        .then(r => r.json())
        .then(({ links }) => setLinks(links ?? []))
      setInput("")
    }
  }
  async function handleDelete(id: string) {
    const res = await fetch(`/api/links?id=${id}`, { method: "DELETE" })
    const data = await res.json()
    if (res.ok) {
      setLinks(prev => prev.filter(l => l.id !== id))
    }
  }

  if (status === "loading" || !session) return null

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">

      {/* Header */}
      <header className="flex items-center justify-between px-md md:px-xl py-md border-b border-border gap-md md:gap-lg">
        <Link href="/dashboard">
          <h1 className="text-lg md:text-xl font-bold hover:text-foreground-muted transition-colors">LinkGuru</h1>
        </Link>

        {/* Search input — hidden on mobile, visible on md+ */}
        <div className="hidden md:flex items-center gap-sm border border-border px-md py-sm w-[500px]">
          <span className="text-foreground-muted text-xs">⌘</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Search or add a link..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground-muted"
            onKeyDown={async e => {
              if (e.key !== "Enter") return
              if (filteredLinks.length > 0) return
              await handleAdd(input)
            }}
          />
        </div>

        <button onClick={() => signOut({ callbackUrl: "/" })} className="text-xs text-foreground-muted hover:text-foreground transition-colors tracking-widest cursor-pointer">
          Log Out
        </button>
      </header>

      {/* Mobile search — shown only on mobile below header */}
      <div className="md:hidden flex items-center gap-sm border-b border-border px-md py-sm">
        <span className="text-foreground-muted text-xs">⌘</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search or add a link..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground-muted"
          onKeyDown={async e => {
            if (e.key !== "Enter") return
            if (filteredLinks.length > 0) return
            await handleAdd(input)
          }}
        />
      </div>

      {/* Main */}
      <main className="flex-1 overflow-y-auto px-xl py-xl">

        <div className="flex items-baseline justify-between mb-xl border-b border-border pb-md">
          <div className="flex items-center gap-sm">
            <Link href="/dashboard" className="text-foreground hover:text-foreground-muted transition-colors text-2xl">
              ⬅ 
            </Link>
            <h2 className="text-2xl md:text-3xl font-bold capitalize">{appInfo?.label ?? appId}</h2>
          </div>
          {/* ✅ show filtered count when searching */}
          <span className="text-xs text-foreground-muted">
            {input.trim() ? `${filteredLinks.length} of ${links.length}` : `Total: ${links.length}`}
          </span>
        </div>

        {loading ? (
          <p className="text-foreground-muted text-xs">Loading...</p>
        ) : links.length === 0 ? (
          <p className="text-foreground-muted text-xs">
            No links saved for {appInfo?.label ?? appId} yet. Paste one above.
          </p>
        ) : filteredLinks.length === 0 ? (
          // ✅ no search results — prompt to add
          <p className="text-foreground-muted text-xs">
            No results for "{input}" — press Enter to save this as a new link.
          </p>
        ) : (
          <ul className="flex flex-col">
            {/* ✅ render filteredLinks not links */}
            {filteredLinks.map(link => (
              <li key={link.id} className="flex items-center gap-md py-md border-b border-border hover:bg-surface transition-colors px-sm group">
                <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                  {link.favicon ? (
                    <img src={link.image ?? link.favicon} alt="" width={25} height={25} className="object-contain" />
                  ) : (
                    <span className="text-foreground-muted text-xs">?</span>
                  )}
                </div>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-xs flex-1 min-w-0">
                  <span className="text-sm font-semibold truncate group-hover:text-foreground transition-colors">
                    {link.title ?? link.description ?? link.url}
                  </span>
                  <span className="text-xs text-foreground-muted truncate">
                    {link.url}
                  </span>
                </a>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground-muted hover:text-foreground text-xs px-sm py-xs border border-transparent hover:border-border shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer — hide verbose text on mobile */}
      <footer className="relative flex items-center justify-between px-md md:px-xl py-sm border-t border-border">
        <span className="text-[10px] text-foreground-muted tracking-widest hidden md:block">
          <a target="_blank" className="hover:text-foreground" href="https://github.com/PranavShadow/LinkGuru">LinkGuru</a>
        </span>
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-md">
          <span className="text-[10px] text-foreground-muted hover:text-foreground cursor-pointer">Privacy</span>
          <span className="text-[10px] text-foreground-muted hover:text-foreground cursor-pointer">Terms</span>
          <span className="text-[10px] text-foreground-muted hover:text-foreground cursor-pointer">Support</span>
        </div>
        <span className="text-[10px] text-foreground-muted hidden md:block">
          View more at <a target="_blank" href="https://github.com/PranavShadow"><span className="hover:text-foreground">github.com/PranavShadow</span></a>
        </span>
      </footer>

    </div>
  )
}