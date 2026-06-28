export default function Registration() {
    return (
        <div className="flex flex-col h-full ml-4xl px-4xl py-4xl">
            <header>
                <h1 className="text-xl font-bold tracking-widest">LinkGuru</h1>
            </header>
            <main className="flex flex-col flex-1 justify-center gap-lg">
                <h1 className="text-4xl font-bold">System Access</h1>
                <form className="flex flex-col gap-md" >
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-foreground-muted text-xs font-bold">Email Address</label>
                        <input id="email" type="email" className="placeholder:text-xs border border-foreground-muted p-2 align-middle outline-0" placeholder="letsgo@gmail.com" />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="text-foreground-muted text-xs font-bold">Password</label>
                            <span className="text-foreground-muted text-xs font-bold hover:text-foreground cursor-pointer">Reset</span>
                        </div>
                        <input type="password" placeholder="••••••••••" className="placeholder:text-xs border border-foreground-muted p-2 align-middle outline-0" />
                    </div>
                    {/* Button */}
                    <button type="submit" className="border border-foreground p-2 align-middle text-foreground cursor-pointer hover:bg-foreground-muted hover:text-background hover:font-bold hover:border-background">Get Set Go</button>
                </form>

                <hr className="text-foreground-muted" />
                <p className="text-sm flex justify-center text-foreground-muted gap-1">Unregistered entity? <span className="text-foreground hover:underline cursor-pointer">Create Account</span></p>
            </main>
            <footer className="text-foreground-muted text-xs">V1.0</footer>
        </div>
    )
}