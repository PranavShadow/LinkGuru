import {parse} from "node-html-parser"

export interface LinkMetaData{
    title: string | null,
    description: string | null,
    image: string | null,
    favicon: string | null
}

export async function fetchMetaData(url: string): Promise<LinkMetaData> {
    try{
        const res = await fetch(url, {
            headers: {
                //pretending to be browser
                "User-Agent" : "Mozilla/5.0 (compatible; LinkGuru/1.0)"
            },
            signal: AbortSignal.timeout(5000)
        })
        const html = await res.text()
        const root = parse(html)

        const getMeta = (selectors: string[]): string | null => {
            for(const selector of selectors){
                const el = root.querySelector(selector)
                const value = el?.getAttribute("content") ?? el?.getAttribute("href")
                if (value) return value
            }
            return null
        }

        const title = getMeta([
            'meta[property="og:title"]',
            'meta[name="twitter:title"]',
        ]) ?? root.querySelector("title")?.text ?? null

        const description = getMeta([
            'meta[property="og:description"]',
            'meta[name="twitter:description"]',
            'meta[name="description"]',
        ])

        const image = getMeta([
            'meta[property="og:image"]',
            'meta[name="twitter:image"]',
        ]) 

        const faviconPath = getMeta([
            'link[rel="icon"]',
            'link[rel="shortcut icon"]',
            'link[rel="apple-touch-icon"]',
        ])

        const favicon = faviconPath ? faviconPath.startsWith("http") ? faviconPath : new URL(faviconPath, url).href : `${new URL(url).origin}/favicon.ico`

        return {title,description,image, favicon}
    }
    catch{
        return{
            title : null,
            description : null,
            image : null,
            favicon : null
        }
    }
}