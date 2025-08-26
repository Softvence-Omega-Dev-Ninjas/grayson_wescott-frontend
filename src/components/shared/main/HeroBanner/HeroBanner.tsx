"use client"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface BannerProps {
  title: string
  subtitle: string
  img: string
  button1: string
  button2?: string
}

function HeroBanner({ title, subtitle, img, button1, button2 }: BannerProps) {
    const path = usePathname()
  return (
    <section
      className="relative w-full h-screen flex items-center"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay (optional) */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-start justify-center text-white space-y-4">
        <h1 className="text-3xl md:w-2/3 md:text-6xl font-bold uppercase leading-tight md:text-start text-center">{title}</h1>
        <p className="md:w-1/3 text-xl md:text-xl max-w-2xl line-clamp-2">{subtitle}</p>

        <div className="flex flex-col items-center md:justify-start  w-full  md:flex-row  gap-4 mt-4">
          <Button className="bg-[#B9BDC6]/80   text-black text-lg px-6 py-6 cursor-pointer hover:text-white  ">
            {button1}
          </Button>
          {path === "/" ? (
             <Button className="bg-transparent border-1 border-white  text-white text-lg px-6 py-6 cursor-pointer hover:text-white  ">
            {button2}
          </Button>
          ):("")}
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
