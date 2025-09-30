'use client';
import { Button } from '@/components/ui/button';

import { usePathname } from 'next/navigation';
import image from '../../../../assets/text.png';
import Image from 'next/image';

interface CTATYPE {
  title?: string;
  description?: string;
  img: string;
  btn1: string;
  btn2?: string;
  onclick?: () => void;
}
function CTA({ title, description, btn1, btn2, img }: CTATYPE) {
  const path = usePathname();
  console.log(path);

  return (
    <>
      <div className="relative">
        <div className="grid md:grid-cols-2 bg-[#1A1A1A] ">
          <div className="container mx-auto flex flex-col  justify-center items-center gap-4 bg-[#1A1A1A] py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              {title}
            </h1>
            <h2 className="text-xl   text-slate-200">{description}</h2>

            <div className="flex flex-col justify-center       md:flex-row  gap-4 mt-4">
              <Button className="bg-[#B9BDC6]/80   text-black text-lg px-6 py-3 cursor-pointer hover:text-white  font-medium">
                {btn1}
              </Button>
              {path == '/programs' || path == '/adonis-protocol' ? (
                <Button className="bg-transparent border-1 border-white  text-white text-lg px-6 py-3 cursor-pointer hover:text-white font-medium ">
                  {btn2}
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
          <div
            className="relative w-full h-[30vh] md:h-[60vh] flex items-center"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        <div className="absolute w-full bottom-0">
          {/* <img src={image.src} className="w-full  " alt="" /> */}
          <Image
            src={image.src}
            alt="asdasd"
            width={300}
            height={300}
            className="w-full object-fill"
          />
        </div>
      </div>
    </>
  );
}

export default CTA;
