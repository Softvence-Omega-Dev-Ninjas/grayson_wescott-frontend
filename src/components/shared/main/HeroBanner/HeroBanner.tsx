"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";

interface BannerProps {
  title: string;
  subtitle: string;
  img: string;
  button1?: string;
  button2?: string;
  users?: { id: number; user: StaticImageData }[];
}

function HeroBanner({ title, subtitle, img, button1, button2, users }: BannerProps) {
  const path = usePathname();
  return (
    <section
      className="relative w-full h-[700px] sm:h-screen flex items-center"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay (optional) */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-start justify-center text-white space-y-4">
        {users && (
          <div className="flex items-center justify-center md:justify-start w-full">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-3 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              {users?.map((item) => {
                return (
                  <div key={item.id}>
                    <Avatar className="size-8 sm:size-12 ">
                      <AvatarImage src={item.user.src} alt="@evilrabbit" />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                  </div>
                );
              })}

              <div className="size-8 sm:size-12 rounded-full z-10 bg-white flex items-center justify-center text-black font-bold bordr-none text-sm">
                1k+
              </div>
            </div>
          </div>
        )}
        <h1 className="text-2xl md:w-2/3 md:text-4xl xl:text-6xl font-bold uppercase leading-tight md:text-start text-center mx-auto md:mx-0">
          {title}
        </h1>
        <p className="w-2/3 xl:w-1/3 text-base md:text-xl max-w-4xl md:text-start text-center mx-auto md:mx-0">{subtitle}</p>

        <div className="flex flex-col items-center md:justify-start  w-full  md:flex-row  gap-4 mt-4">
          {button1 && (
            <Button className="bg-[#B9BDC6]/80 hover:bg-[#B9BDC6]/70  text-black text-lg px-6 py-4 font-medium cursor-pointer hover:text-white  ">
              {button1}
            </Button>
          )}
          {path === "/" ? (
            <Button className="bg-transparent border-1 border-white  text-white text-lg px-6 py-4 font-medium cursor-pointer hover:text-white">
              {button2}
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
