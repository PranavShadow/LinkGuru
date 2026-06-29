import { supabase } from "../lib/supabase";

export default async function Hero(){
    const { count, error } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });
    return(
        <div className="flex flex-col h-full px-4xl py-4xl">
            <header>
                <p className="text-xs text-right text-foreground-muted">Created by <a href="https://github.com/PranavShadow" className="hover:text-foreground">PranavShadow</a></p>
            </header>
            <main className="flex flex-col flex-1 gap-lg justify-center">
                <h1 className="text-6xl uppercase font-extrabold w-[60%]">Architecture for the Chaotic web.</h1>
                <p className="text-sm">LinkGuru is made for chaotic users like Vrinda. She's always in a hurry, doesn't like spending time searching for links, and never has the right link when she needs it. She's basically a mess. She finds bookmarking too chaotic and thinks sending links on WhatsApp is old-fashioned.</p>
                <div>
                <p className="text-sm text-foreground-muted">If you've ever faced the same hustle as Vrinda, <span className="text-foreground">LinkGuru</span> might be the solution you've been looking for.</p>
                <p className="text-sm text-foreground-muted">Give it a try and see the difference for yourself.</p>
                </div>
            </main>
            <footer>
                <div className="float-right border text-foreground-muted p-md">
                    <ul className="text-xs">
                        <li>System Status</li>
                        <li className="flex justify-between gap-3xl"><p>Active Users:</p> <span className="text-foreground">{count || 0} user</span></li>
                        <li className="flex justify-between gap-3xl"><p>Latency:</p> <span className="text-foreground">10ms</span></li>
                        <li></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}