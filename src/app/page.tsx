import Registration from "../components/registration";
import Hero from "../components/hero";

export default function Home() {
  return (
    <div className="h-screen flex">
      {/* Mobile: full width | Desktop: 40% */}
      <div className="w-full md:w-[700px] md:shrink-0">
        <Registration />
      </div>

      {/* Mobile: hidden | Desktop: fills remaining space */}
      <div className="hidden md:flex flex-1">
        <Hero />
      </div>
    </div>
  )
}