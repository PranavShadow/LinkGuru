const APP_PATTERNS: Record<string, RegExp> = {
    // Video
    youtube: /youtube\.com|youtu\.be/,
    netflix: /netflix\.com/,
    primevideo: /primevideo\.com|amazon\.com\/prime/,
    hotstar: /hotstar\.com/,
    twitch: /twitch\.tv/,
    vimeo: /vimeo\.com/,

    // Social
    linkedin: /linkedin\.com/,
    twitter: /twitter\.com|x\.com/,
    instagram: /instagram\.com/,
    facebook: /facebook\.com|fb\.com/,
    reddit: /reddit\.com/,
    threads: /threads\.net/,
    pinterest: /pinterest\.com/,
    snapchat: /snapchat\.com/,

    // Dev
    github: /github\.com/,
    gitlab: /gitlab\.com/,
    stackoverflow: /stackoverflow\.com/,
    codepen: /codepen\.io/,
    replit: /replit\.com/,
    vercel: /vercel\.com/,
    npmjs: /npmjs\.com/,
    kaggle: /kaggle\.com/,

    // Design
    figma: /figma\.com/,
    dribbble: /dribbble\.com/,
    behance: /behance\.net/,
    awwwards: /awwwards\.com/,

    // Productivity
    notion: /notion\.so/,
    trello: /trello\.com/,
    asana: /asana\.com/,
    linear: /linear\.app/,
    jira: /atlassian\.com|jira\./,
    chatgpt: /chatgpt\.com|chat\.openai\.com/,
    udemy: /udemy\.com/,
    coursera: /coursera\.org/,
    leetcode: /leetcode\.com/,
    hackerrank: /hackerrank\.com/,
    codeforces: /codeforces\.com/,
    codechef: /codechef\.com/,
    claude: /claude\.ai/,
    perplexity: /perplexity\.ai/,
    linktree: /linktr\.ee/,
    hackerearth: /hackerearth\.com/,
    codeblocks: /codeblocks\.org/,
    hostinger: /hostinger\.com/,
    godaddy: /godaddy\.com/,


    //Job Portals

    naukri: /naukri\.com/,
    wellfound: /wellfound\.com|angel\.co/,
    remoteok: /remoteok\.com/,
    ycombinator: /ycombinator\.com|news\.ycombinator\.com/,
    indeed: /indeed\.com/,
    internshala: /internshala\.com/,
    upwork: /upwork\.com/,

    // Google
    drive: /drive\.google\.com/,
    docs: /docs\.google\.com/,
    sheets: /sheets\.google\.com/,
    slides: /slides\.google\.com/,
    gmail: /mail\.google\.com/,
    meet: /meet\.google\.com/,
    calendar: /calendar\.google\.com/,

    // Communication
    slack: /slack\.com/,
    discord: /discord\.com|discord\.gg/,
    telegram: /t\.me|telegram\.org/,
    whatsapp: /whatsapp\.com/,
    zoom: /zoom\.us/,

    // Music
    spotify: /spotify\.com/,
    soundcloud: /soundcloud\.com/,
    applemusic: /music\.apple\.com/,

    // Shopping
    amazon: /amazon\.com|amazon\.in/,
    flipkart: /flipkart\.com/,
    meesho: /meesho\.com/,
    myntra: /myntra\.com/,
    nykaa: /nykaa\.com/,
    ajio: /ajio\.com/,

    // News / Reading
    medium: /medium\.com/,
    substack: /substack\.com/,

    // Cloud
    dropbox: /dropbox\.com/,
    onedrive: /onedrive\.live\.com/,

    //Game

    steam: /store\.steampowered\.com|steamcommunity\.com/,

}

export function classifyUrl(url: string): string {
    try {
        const hostname = new URL(url).hostname //github.com
        for (const [app, pattern] of Object.entries(APP_PATTERNS)) {
            if (pattern.test(hostname)) return app
        }
        return "other"
    }
    catch {
        return "other"
    }
}

export const SUPPORTED_APPS = Object.keys(APP_PATTERNS)