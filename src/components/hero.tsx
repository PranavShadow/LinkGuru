export default function Hero(){
    return(
        <div className="flex flex-col h-full px-4xl py-4xl">
            <header>
                <p className="text-xs text-right text-foreground-muted">Created by <a href="https://github.com/PranavShadow" className="hover:text-foreground">PranavShadow</a></p>
            </header>
            <main className="flex flex-col flex-1 gap-lg justify-center">
                <h1 className="text-6xl uppercase font-extrabold w-[60%]">Architecture for the Chaotic web.</h1>
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio asperiores nemo ullam ipsam tenetur qui molestiae corrupti nam, pariatur perferendis natus architecto doloremque, dolores officiis hic! Similique labore nostrum quisquam eos ea autem iure, molestiae ratione est voluptates possimus magni incidunt sed enim quasi officiis consequatur ducimus accusantium expedita? Velit?</p>
                <p className="text-sm text-foreground-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor eaque neque temporibus. Quasi repudiandae aliquam corrupti accusantium, excepturi quis sunt?</p>
            </main>
            <footer>
                <div className="float-right border text-foreground-muted p-md">
                    <ul className="text-sm m-xs">
                        <li>System Status</li>
                        <li className="flex justify-between gap-xs"><p>Uptime:</p> <span className="text-foreground">99.99%</span></li>
                        <li className="flex justify-between gap-sm"><p>Latency:</p> <span className="text-foreground">10ms</span></li>
                        <li></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}