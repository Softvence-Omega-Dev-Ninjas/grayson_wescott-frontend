"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Header() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/coaching", label: "Coaching" },
    { href: "/adonis-protocol", label: "Adonis Protocol" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-white">
          <Link href="/">Adonis</Link>
        </div>

        {/* Middle: Nav Links (desktop) */}
        <div className="hidden md:flex space-x-8 text-white font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Profile + Button */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10 border-2 border-white">
            <AvatarImage src="/profile.jpg" alt="profile" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <Button className="rounded-2xl bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 hidden sm:flex">
            Start your engine
          </Button>

          {/* Mobile Menu (hamburger) */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black/95 text-white">
                <nav className="flex flex-col space-y-6 mt-10 text-lg">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setOpen(false)}
                      className="hover:text-sky-400"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
