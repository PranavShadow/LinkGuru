// this route.ts file for testing metadata.ts

import { fetchMetaData } from "@/src/lib/metadata"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get("url") ?? "https://github.com"
  const meta = await fetchMetaData(url)
  return Response.json(meta)
}