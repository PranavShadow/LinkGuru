import { supabase } from "../lib/supabase";

export default async function Hero() {
    const { count } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

    return (
        <div className="flex flex-col h-full px-xl py-xl md:px-2xl md:py-2xl lg:px-4xl lg:py-4xl">
            <header>
                <p className="text-xs text-right text-foreground-muted">
                    Created by{" "}
                    <a target="_blank" href="https://github.com/PranavShadow" className="hover:text-foreground">PranavShadow</a>
                </p>
            </header>
            <main className="flex flex-col flex-1 gap-lg justify-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase font-extrabold w-full lg:w-[60%]">
                    Architecture for the Chaotic web.
                </h1>
                <p className="text-sm">
                    LinkGuru is made for chaotic users like Vrinda. She's always in a hurry, doesn't like spending time searching for links, and never has the right link when she needs it.
                </p>
                <div>
                    <p className="text-sm text-foreground-muted">
                        If you've ever faced the same hustle as Vrinda,{" "}
                        <span className="text-foreground">LinkGuru</span> might be the solution you've been looking for.
                    </p>
                    <p className="text-sm text-foreground-muted">Give it a try and see the difference for yourself.</p>
                </div>
            </main>
            <footer className="flex justify-end">
                <div className="border text-foreground-muted p-md">
                    <ul className="text-xs">
                        <li className="mb-xs">System Status</li>
                        <li className="flex justify-between gap-xl"><p>Active Users:</p><span className="text-foreground">{count || 0} user</span></li>
                        <li className="flex justify-between gap-xl"><p>Latency:</p><span className="text-foreground">706.79 ms</span></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}