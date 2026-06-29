"use client"
import { useState } from "react";

export default function Registration() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className="flex flex-col h-full ml-4xl px-4xl py-4xl">
            <header>
                <h1 className="text-xl font-bold tracking-widest">LinkGuru</h1>
            </header>
            <main className="flex flex-col flex-1 justify-center gap-lg">
                <h1 className="text-4xl font-bold">
                    {isLogin ? "System Access" : "Request Allocation"}
                    </h1>
                <form className="flex flex-col gap-md" >
                    {/* Name */}
                    {!isLogin && (<div className="flex flex-col">
                        <label htmlFor="name" className="text-foreground-muted text-xs font-bold">Name</label>
                        <input type="name" className="placeholder:text-xs border border-foreground-muted p-2 align-middle outline-0" placeholder="Vrinda Gupta"/>
                    </div>)}
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-foreground-muted text-xs font-bold">Email Address</label>
                        <input id="email" type="email" className="placeholder:text-xs border border-foreground-muted p-2 align-middle outline-0" placeholder="letsgo@gmail.com" />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-foreground-muted text-xs font-bold">Password</label>
                            {isLogin && (<span className="text-foreground-muted text-xs font-bold hover:text-foreground cursor-pointer">Reset</span>)}
                        </div>
                        <input type="password" placeholder="••••••••••" className="placeholder:text-xs border border-foreground-muted p-2 align-middle outline-0" />
                    </div>
                    {/* Confirm Password */}
                    {!isLogin && (<div className="flex flex-col">
                        <label htmlFor="confirm" className="text-foreground-muted text-xs font-bold">Confirm Password</label>
                        <input type="password" placeholder="••••••••••" className="placeholder:text-xs border border-foreground-muted p-2 align-middle outline-0" />
                    </div>)}
                    {/* Button */}
                    <button type="submit" className="border border-foreground p-2 align-middle text-foreground cursor-pointer hover:bg-foreground-muted hover:text-background hover:font-bold hover:border-background">{isLogin? "Get Set Go" : "Initialize"}</button>
                </form>

                <hr className="text-foreground-muted" />
                <p className="text-sm flex justify-center text-foreground-muted gap-1">Unregistered entity? <span className="text-foreground hover:underline cursor-pointer" onClick={() => setIsLogin(!isLogin)}>{isLogin? "Create Account" : "Login"}</span></p>
            </main>
            <footer className="text-foreground-muted text-xs">V1.0</footer>
        </div>
    )
}