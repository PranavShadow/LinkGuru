"use client"
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
            const res = await signIn("credentials", {
                email, password, redirect:false
            })
            if(res?.error) setError("Invalid email or Password")
            else router.push("/dashboard")
        }
        else{
            if(password !== confirm) return setError("Passwords don't match")
            const res = await signUpUser(name, email, password)
            if(res.error) setError(res.error)
            else{
                await signIn("credentials", {email, password, redirect:false})
                router.push("/dashboard")
            }
        }
    }

    return (
        <div className="flex flex-col h-full px-md py-lg md:px-xl md:py-2xl lg:px-4xl lg:py-4xl">
            <header>
                <h1 className="text-xl font-bold tracking-widest">LinkGuru</h1>
            </header>
            <main className="flex flex-col flex-1 justify-center gap-lg">
                <h1 className="text-4xl font-bold">
                    {isLogin ? "System Access" : "Request Allocation"}
                    </h1>
                <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
                    {/* Name */}
                    {!isLogin && (<div className="flex flex-col">
                        <label htmlFor="name" className="text-foreground-muted text-xs font-bold">Name</label>
                        <input id="name" type="name" value={name} onChange={e => setName(e.target.value)} className="w-full placeholder:text-xs border border-foreground-muted p-2 align-middle outline-0" placeholder="Vrinda Gupta" required/>
                    </div>)}
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-foreground-muted text-xs font-bold">Email Address</label>
                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full placeholder:text-xs border border-foreground-muted p-2 align-middle outline-0" placeholder="letsgo@gmail.com" required/>
                    </div>
                    {/* Password */}
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-foreground-muted text-xs font-bold">Password</label>
                            {isLogin && (<span className="text-foreground-muted text-xs font-bold hover:text-foreground cursor-pointer">Reset</span>)}
                        </div>
                        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••" className="w-full placeholder:text-xs border border-foreground-muted p-2 align-middle outline-0" required />
                    </div>
                    {/* Confirm Password */}
                    {!isLogin && (<div className="flex flex-col">
                        <label htmlFor="confirm" className="text-foreground-muted text-xs font-bold">Confirm Password</label>
                        <input id="confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••••" className="w-full placeholder:text-xs border border-foreground-muted p-2 align-middle outline-0" required/>
                    </div>)}
                    {/* Error Message */}
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    {/* Button */}
                    <button type="submit" className="w-full border border-foreground p-2 align-middle text-foreground cursor-pointer hover:bg-foreground-muted hover:text-background hover:font-bold hover:border-background">{isLogin? "Get Set Go" : "Initialize"}</button>
                    {/* Google */}
                    <button type="button" onClick={()=> signIn("google", {callbackUrl: "/dashboard"})} className="w-full border border-foreground-muted p-2 text-foreground-muted cursor-pointer hover:border-foreground hover:text-foreground">Continue with Google</button>
                </form>

                <hr className="text-foreground-muted" />
                <p className="text-sm flex justify-center text-foreground-muted gap-1">{isLogin? "Unregistered entity?" : "Already registered?"} <span className="text-foreground hover:underline cursor-pointer" onClick={() => {setIsLogin(!isLogin); setError("")}}>{isLogin? "Create Account" : "Login"}</span></p>
            </main>
            <footer className="text-foreground-muted text-xs">V1.0</footer>
        </div>
    )
}