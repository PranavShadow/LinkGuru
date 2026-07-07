import {
  SiYoutube, SiNetflix, SiVimeo, SiTwitch, SiX, SiInstagram, SiFacebook, SiReddit, SiThreads,
  SiPinterest, SiSnapchat, SiGithub, SiGitlab, SiStackoverflow, SiReplit, SiVercel, SiNpm, SiFigma, SiDribbble,
  SiBehance, SiAwwwards, SiNotion, SiTrello, SiAsana, SiLinear,
  SiJira, SiGoogledrive, SiGoogledocs, SiGooglesheets, SiGoogleslides,
  SiGmail, SiGooglemeet, SiGooglecalendar, SiDiscord,
  SiTelegram, SiWhatsapp, SiZoom, SiSpotify, SiSoundcloud,
  SiApplemusic, SiMedium, SiSubstack, SiDropbox, SiCodeblocks, SiCodechef, SiLeetcode, SiLinktree, SiClaude, SiYcombinator, SiHackerearth, SiHostinger, SiIndeed, SiHackerrank, SiCodeforces, SiUpwork, SiWellfound, SiKaggle, SiPerplexity, SiSteam, SiUdemy, SiCoursera, SiGodaddy,
} from "react-icons/si"
import { ComponentType } from "react"
import {MeeshoIcon, PrimeVideoIcon, ChatGPTIcon, CodePenIcon, HotstarIcon, SlackIcon, LinkedInIcon, MyntraIcon, } from "../components/icons/icons"
import { TbWorld } from "react-icons/tb"

export interface App {
  id: string
  label: string
  icon: ComponentType<{ size?: number; color?: string; className?: string }>
  color: string  // active color when links exist
}

export const APPS: App[] = [
  // =========================
  // Entertainment
  // =========================
  { id: "youtube", label: "YouTube", icon: SiYoutube, color: "#FF0000" },
  { id: "netflix", label: "Netflix", icon: SiNetflix, color: "#E50914" },
  { id: "primevideo", label: "Prime", icon: PrimeVideoIcon, color: "#00A8E1" },
  { id: "hotstar", label: "Hotstar", icon: HotstarIcon, color: "#1F80E0" },
  { id: "spotify", label: "Spotify", icon: SiSpotify, color: "#1DB954" },
  { id: "applemusic", label: "Apple Music", icon: SiApplemusic, color: "#FC3C44" },
  { id: "soundcloud", label: "SoundCloud", icon: SiSoundcloud, color: "#FF5500" },
  { id: "twitch", label: "Twitch", icon: SiTwitch, color: "#9146FF" },
  { id: "vimeo", label: "Vimeo", icon: SiVimeo, color: "#1AB7EA" },

  // =========================
  // Social Media
  // =========================
  { id: "instagram", label: "Instagram", icon: SiInstagram, color: "#E1306C" },
  { id: "facebook", label: "Facebook", icon: SiFacebook, color: "#1877F2" },
  { id: "twitter", label: "Twitter", icon: SiX, color: "#ffffff" },
  { id: "linkedin", label: "LinkedIn", icon: LinkedInIcon, color: "#0A66C2" },
  { id: "reddit", label: "Reddit", icon: SiReddit, color: "#FF4500" },
  { id: "threads", label: "Threads", icon: SiThreads, color: "#ffffff" },
  { id: "pinterest", label: "Pinterest", icon: SiPinterest, color: "#E60023" },
  { id: "snapchat", label: "Snapchat", icon: SiSnapchat, color: "#FFFC00" },

  // =========================
  // Communication
  // =========================
  { id: "whatsapp", label: "WhatsApp", icon: SiWhatsapp, color: "#25D366" },
  { id: "telegram", label: "Telegram", icon: SiTelegram, color: "#2AABEE" },
  { id: "discord", label: "Discord", icon: SiDiscord, color: "#5865F2" },
  { id: "slack", label: "Slack", icon: SlackIcon, color: "#4A154B" },
  { id: "zoom", label: "Zoom", icon: SiZoom, color: "#2D8CFF" },

  // =========================
  // Shopping
  // =========================
  { id: "meesho", label: "Meesho", icon: MeeshoIcon, color: "#F43397" },
  { id: "myntra", label: "Myntra", icon: MyntraIcon, color: "#F43397" },
  // { id: "amazon", label: "Amazon", icon: AmazonIcon, color: "#FF9900" },
  // { id: "flipkart", label: "Flipkart", icon: FlipkartIcon, color: "#2874F0" },

  // =========================
  // Productivity & Work
  // =========================
  { id: "notion", label: "Notion", icon: SiNotion, color: "#ffffff" },
  { id: "trello", label: "Trello", icon: SiTrello, color: "#0052CC" },
  { id: "asana", label: "Asana", icon: SiAsana, color: "#F06A6A" },
  { id: "linear", label: "Linear", icon: SiLinear, color: "#5E6AD2" },
  { id: "jira", label: "Jira", icon: SiJira, color: "#0052CC" },

  // =========================
  // Google Workspace
  // =========================
  { id: "gmail", label: "Gmail", icon: SiGmail, color: "#EA4335" },
  { id: "drive", label: "Drive", icon: SiGoogledrive, color: "#4285F4" },
  { id: "docs", label: "Docs", icon: SiGoogledocs, color: "#4285F4" },
  { id: "sheets", label: "Sheets", icon: SiGooglesheets, color: "#34A853" },
  { id: "slides", label: "Slides", icon: SiGoogleslides, color: "#FBBC05" },
  { id: "meet", label: "Meet", icon: SiGooglemeet, color: "#00897B" },
  { id: "calendar", label: "Calendar", icon: SiGooglecalendar, color: "#4285F4" },

  // =========================
  // AI
  // =========================
  { id: "chatgpt", label: "ChatGPT", icon: ChatGPTIcon, color: "#10A37F" },
  { id: "claude", label: "Claude", icon: SiClaude, color: "#CC785C" },
  { id: "perplexity", label: "Perplexity", icon: SiPerplexity, color: "#20808D" },

  // =========================
  // Development
  // =========================
  { id: "github", label: "GitHub", icon: SiGithub, color: "#ffffff" },
  { id: "vercel", label: "Vercel", icon: SiVercel, color: "#ffffff" },
  { id: "npmjs", label: "npm", icon: SiNpm, color: "#CB3837" },
  { id: "gitlab", label: "GitLab", icon: SiGitlab, color: "#FC6D26" },
  { id: "stackoverflow", label: "Stack", icon: SiStackoverflow, color: "#F58025" },
  { id: "replit", label: "Replit", icon: SiReplit, color: "#F26207" },
  { id: "codepen", label: "CodePen", icon: CodePenIcon, color: "#ffffff" },
  { id: "codeblocks", label: "CodeBlocks", icon: SiCodeblocks, color: "#ffffff" },
  { id: "leetcode", label: "LeetCode", icon: SiLeetcode, color: "#FFA116" },
  { id: "hackerrank", label: "HackerRank", icon: SiHackerrank, color: "#00EA64" },
  { id: "codechef", label: "CodeChef", icon: SiCodechef, color: "#5B4638" },
  { id: "codeforces", label: "Codeforces", icon: SiCodeforces, color: "#1F8ACB" },
  { id: "hackerearth", label: "HackerEarth", icon: SiHackerearth, color: "#2C3454" },
  { id: "hostinger", label: "Hostinger", icon: SiHostinger, color: "#673DE6" },
  { id: "godaddy", label: "GoDaddy", icon: SiGodaddy, color: "#1BDBDB" },
  { id: "linktree", label: "Linktree", icon: SiLinktree, color: "#43E55E" },
  { id: "ycombinator", label: "YCombinator", icon: SiYcombinator, color: "#FF6600" },

  // =========================
  // Learning
  // =========================
  { id: "coursera", label: "Coursera", icon: SiCoursera, color: "#0056D2" },
  { id: "udemy", label: "Udemy", icon: SiUdemy, color: "#A435F0" },
  { id: "kaggle", label: "Kaggle", icon: SiKaggle, color: "#20BEFF" },

  // =========================
  // Design
  // =========================
  { id: "figma", label: "Figma", icon: SiFigma, color: "#F24E1E" },
  { id: "dribbble", label: "Dribbble", icon: SiDribbble, color: "#EA4C89" },
  { id: "behance", label: "Behance", icon: SiBehance, color: "#1769FF" },
  { id: "awwwards", label: "Awwwards", icon: SiAwwwards, color: "#ffffff" },

  // =========================
  // Careers & Freelancing
  // =========================
  { id: "indeed", label: "Indeed", icon: SiIndeed, color: "#003A9B" },
  { id: "upwork", label: "Upwork", icon: SiUpwork, color: "#6FDA44" },
  { id: "wellfound", label: "Wellfound", icon: SiWellfound, color: "#ffffff" },

  // =========================
  // Reading
  // =========================
  { id: "medium", label: "Medium", icon: SiMedium, color: "#ffffff" },
  { id: "substack", label: "Substack", icon: SiSubstack, color: "#FF6719" },

  // =========================
  // Cloud Storage
  // =========================
  { id: "dropbox", label: "Dropbox", icon: SiDropbox, color: "#0061FF" },

  // =========================
  // Gaming
  // =========================
  { id: "steam", label: "Steam", icon: SiSteam, color: "#1B2838" },

  // =========================
  // Others
  // =========================

  { id: "other", label: "Other", icon: TbWorld, color: "#ffffff" },
]