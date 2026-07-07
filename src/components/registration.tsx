"use client"
export const dynamic = "force-dynamic";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpUser } from "../lib/signup";

export default function Registration() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        if(isLogin){
            const res = await signIn("credentials", { email, password, redirect: false })
            if(res?.error) setError("Invalid email or Password")
            else router.push("/dashboard")
        } else {
            if(password !== confirm) return setError("Passwords don't match")
            const res = await signUpUser(name, email, password)
            if(res.error) setError(res.error)
            else {
                await signIn("credentials", { email, password, redirect: false })
                router.push("/dashboard")
            }
        }
    }

    return (
        <div className="flex flex-col h-full px-md py-lg md:px-xl md:py-2xl lg:px-4xl lg:py-4xl">
            <header>
                <h1 className="text-lg md:text-xl font-bold tracking-widest">LinkGuru</h1>
            </header>
            <main className="flex flex-col flex-1 justify-center gap-md md:gap-lg">
                <h1 className="text-3xl md:text-4xl font-bold">
                    {isLogin ? "System Access" : "Request Allocation"}
                </h1>
                <form className="flex flex-col gap-sm md:gap-md" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-foreground-muted text-xs font-bold">Name</label>
                            <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="w-full placeholder:text-xs border border-foreground-muted p-2 outline-0 bg-transparent" placeholder="Vrinda Gupta" required/>
                        </div>
                    )}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-foreground-muted text-xs font-bold">Email Address</label>
                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full placeholder:text-xs border border-foreground-muted p-2 outline-0 bg-transparent" placeholder="letsgo@gmail.com" required/>
                    </div>
                    
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-foreground-muted text-xs font-bold">Password</label>
                            {isLogin && <span className="text-foreground-muted text-xs font-bold hover:text-foreground cursor-pointer">Reset</span>}
                        </div>
                        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••" className="w-full placeholder:text-xs border border-foreground-muted p-2 outline-0 bg-transparent" required/>
                    </div>
                    {!isLogin && (
                        <div className="flex flex-col">
                            <label htmlFor="confirm" className="text-foreground-muted text-xs font-bold">Confirm Password</label>
                            <input id="confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••••" className="w-full placeholder:text-xs border border-foreground-muted p-2 outline-0 bg-transparent" required/>
                        </div>
                    )}
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button type="submit" className="w-full border border-foreground p-2 text-foreground cursor-pointer hover:bg-foreground-muted hover:text-background hover:font-bold hover:border-background transition-colors">
                        {isLogin ? "Get Set Go" : "Initialize"}
                    </button>
                    <button type="button" onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="w-full border border-foreground-muted p-2 text-foreground-muted cursor-pointer hover:border-foreground hover:text-foreground transition-colors">
                        Continue with Google
                    </button>
                </form>
                <hr className="border-foreground-muted" />
                <p className="text-xs md:text-sm flex justify-center text-foreground-muted gap-1">
                    {isLogin ? "Unregistered entity?" : "Already registered?"}{" "}
                    <span className="text-foreground hover:underline cursor-pointer" onClick={() => { setIsLogin(!isLogin); setError("") }}>
                        {isLogin ? "Create Account" : "Login"}
                    </span>
                </p>
            </main>
            <footer className="text-foreground-muted text-xs">V1.1</footer>
        </div>
    )
}