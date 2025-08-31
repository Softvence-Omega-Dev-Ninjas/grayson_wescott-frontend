"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import logo from "../../../../assets/header/logo.png";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/coaching", label: "Coaching" },
    { href: "/adonis-protocol", label: "Adonis Protocol" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-1 transition-all duration-300 ${
        isScrolled ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="md:container mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-white">
          <Link href="/">
            <Image src={logo} alt="logo"></Image>
          </Link>
        </div>

        {/* Middle: Nav Links (desktop) */}
        <div className="hidden xl:flex space-x-12 text-white text-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`pb-1 transition ${isActive ? "border-b-2 border-white" : "hover:border-b-2 hover:border-gray-400"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Profile + Button */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10 border-2 border-white">
            <AvatarImage src="/profile.jpg" alt="profile" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <Button style={{ backgroundColor: "var(--color-secondary)" }} className="text-white px-5 py-5 hidden sm:flex cursor-pointer">
            Start your engine
          </Button>

          {/* Mobile Menu (hamburger) */}
          <div className="xl:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black/95 text-white">
                <nav className="flex flex-col space-y-6 mt-10 text-lg">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="hover:text-sky-400">
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
  );
}
