import Image from "next/image";
import Registration from "../components/registration";
import Hero from "../components/hero";

export default function Home() {
  return (
    <div className="h-screen flex justify-between">
      <Registration />
      <Hero />
    </div>
  )
} 