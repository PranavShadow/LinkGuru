# LinkGuru

> A personal link organizer that automatically categorizes your saved URLs by platform.

![Version](https://img.shields.io/badge/version-1.0.0-white?style=flat-square&labelColor=131313)
![Next.js](https://img.shields.io/badge/Next.js-16-white?style=flat-square&labelColor=131313)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-white?style=flat-square&labelColor=131313)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-white?style=flat-square&labelColor=131313)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-white?style=flat-square&labelColor=131313)
![NextAuth.js](https://img.shields.io/badge/Auth-NextAuth.js-white?style=flat-square&labelColor=131313)
![Google OAuth](https://img.shields.io/badge/OAuth-Google-white?style=flat-square&labelColor=131313)

---

## What is LinkGuru?

The internet is chaos. Bookmarks are a graveyard. Tabs pile up. Links get lost in Notion pages, WhatsApp chats, and browser history.

LinkGuru is a tool that brings order to that chaos. Paste a URL — any URL — and it automatically classifies it by platform, scrapes its metadata, and stores it in a structured, searchable library. YouTube videos go to YouTube. GitHub repos go to GitHub. LinkedIn profiles go to LinkedIn. No manual tagging. No folders. Just paste and it figures it out.

---

## Features

- **Auto-classification** — Recognizes 70+ platforms including YouTube, GitHub, LinkedIn, Figma, Notion, Spotify, and more
- **Metadata scraping** — Pulls title, description, favicon, and preview image from every link
- **Per-platform views** — Browse all your YouTube links, all your GitHub repos, all your Figma files — separately
- **Live search** — Filter links instantly by title, URL, or description
- **Smart input** — One input box. If it matches existing links, it filters. If not, pressing Enter saves the new link
- **Active indicators** — Platforms light up in their brand color when you have links saved there
- **Auth** — Email/password and Google OAuth. Your links are private to you
- **Delete** — Remove links you no longer need
- **Responsive** — Works on mobile and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Font | Space Grotesk |
| Database | Supabase (PostgreSQL) |
| Auth | NextAuth.js + Google OAuth |
| Icons | react-icons (Simple Icons + Tabler) |
| Metadata | Custom HTML scraper (node-html-parser) |

---
## Project Metrics

## Performance Metrics

| Action | Endpoint | Request Time (ms) | Response Time (ms) | Estimated Latency (ms) |
|---------|----------|------------------:|-------------------:|-----------------------:|
| Page Load | `GET /api/auth/session` | 0.37 | 178 | 177.63 |
| Login | `POST /api/auth/callback/credentials` | 0.15 | 900 | 899.85 |
| Paste Link | `POST /api/links` | 0.17 | 950 | 949.83 |
| Delete Link | `DELETE /api/links?id=...` | 0.15 | 800 | 799.85 |

---

## Average Performance

| Metric | Value |
|--------|-------:|
| **Average Request Time** | **0.21 ms** |
| **Average Response Time** | **707 ms** |
| **Average Latency** | **706.79 ms** |
---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account
- A Google Cloud project (for OAuth)

### 1. Clone the repo

```bash
git clone https://github.com/PranavShadow/LinkGuru.git
cd LinkGuru
npm install
```

### 2. Set up Supabase

Create a new Supabase project. In the SQL Editor, run:

```sql
create table users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  password_hash text,
  provider text default 'credentials',
  created_at timestamp default now()
);

create table links (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  url text not null,
  app text not null,
  title text,
  description text,
  image text,
  favicon text,
  created_at timestamp default now()
);

alter table users disable row level security;
alter table links disable row level security;
```

### 3. Set up environment variables

Create `.env.local` in the project root:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## How it works

```
User pastes a URL
      ↓
classifyUrl()     — matches domain against 70+ regex patterns
fetchMetadata()   — fetches the page HTML, extracts og:title, og:image, favicon
      ↓
Stored in Supabase links table with user_id, app, title, image, favicon
      ↓
Dashboard lights up the platform icon
User can browse, search, and delete links per platform
```

---

# Project Structure

```text
src/
├── app/
│   ├── (routes)/
│   │   └── dashboard/
│   │       ├── page.tsx                  — Dashboard (app grid)
│   │       └── [app]/
│   │           └── page.tsx              — Platform-specific links
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts              — NextAuth handler
│   │   ├── links/
│   │   │   └── route.ts                  — GET / POST / DELETE links
│   │   └── test/
│   │       └── route.ts                  — Test API
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                          — Landing / auth page
│
├── components/
│   ├── hero.tsx
│   ├── providers.tsx
│   ├── registration.tsx
│   └── icons/                            — Custom SVG icon components
│
├── lib/
│   ├── apps.ts                           — App definitions
│   ├── classify.ts                       — URL classification logic
│   ├── metadata.ts                       — Metadata & favicon scraper
│   ├── signup.ts                         — User registration helper
│   └── supabase.ts                       — Supabase client
│
├── test/
│   └── classify.test.ts                  — Unit tests
│
└── proxy.ts                              — Middleware / request proxy
```

---

## Author

Built by [PranavShadow](https://github.com/PranavShadow)
