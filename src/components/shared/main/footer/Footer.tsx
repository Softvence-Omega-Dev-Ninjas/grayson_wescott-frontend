import {
  Linkedin,
  Facebook,
  Instagram,
 
  
  LocateFixed
} from "lucide-react";
import Link from "next/link";
import logo from '../../../../assets/header/logo.png'
import Image from "next/image";
import bg from '../../../../assets/footerbg.png'

const Footer = () => {
  return (
    <footer className=" text-white py-10 relative"
    style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        
      }}>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="space-y-4">
          <div className="text-2xl font-bold flex items-center gap-2">
           <Image src={logo} alt="logo"></Image>
          </div>
          <p className="text-sm md:text-base">
           Join Carbon Engine Today and Transform Your Life with Expert Guidance, Personalized Programs, and a Supportive Community. Your Fitness Journey Starts Now!
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/programs" className="hover:text-gray-300 transition">
                Programs
              </Link>
            </li>
            <li>
              <Link href="/coaching" className="hover:text-gray-300 transition">
                Coaching
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm md:text-base flex items-center gap-2">
            <LocateFixed className="w-4 h-4" />
            256B, West Site House Main Town, New York
          </p>
          
          <div className="flex justify-center md:justify-start">
             <button className=" bg-[#2F2F2F]/80 cursor-pointer transition text-white px-4 py-2 rounded ">
            START YOUR ENGINE
          </button>
          </div>
         
        </div>
      </div>

      {/* Divider */}
      <div className=" container mx-auto border-t border-gray-700 mt-8"></div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 mt-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-sm">&copy; Copyright 2025, All Rights Reserved by CARBON ENGINES</p>
        <div className="flex gap-4 text-white text-lg">
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="hover:text-sky-500 transition" />
          </a>
          <a href="#" aria-label="Facebook">
            <Facebook className="hover:text-sky-500 transition" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="hover:text-red-400 transition" />
          </a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;