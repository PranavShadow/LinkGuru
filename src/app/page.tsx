import Image from "next/image";
import Registration from "../components/registration";
import Hero from "../components/hero";

export default function Home() {
  return (
    <div className="h-screen flex">
      <div className="w-[40%]">
      <Registration />
      </div>
      <div className="flex-1">
      <Hero />
      </div>
    </div>
  )
} 