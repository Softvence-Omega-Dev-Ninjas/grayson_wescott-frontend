import React from "react";
import img from "../../../../assets/farrow.png";
import Image from "next/image";
interface PricingProps {
  item: {
    title: string;
    price: string;
    batchText: string;
    subtitle: string;
    features: string[];
    btn: string;
    onClick?: () => void;
    isEnable: boolean;
  };
}

function PricingCard({ item }: PricingProps) {
  return (
    <div className="">
      <div
        className={`border-2 ${item.isEnable ? "bg-[#2A2D33]" : ""} transition-all duration-300 ease-in-out 
                hover:scale-105 hover:shadow-xl border-[#B9BDC6] px-8 py-5 space-y-4 min-h-[400px] flex flex-col justify-between text-white`}
      >
        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-bold">{item.title}</h1>
            <div className="space-x-2    flex items-end">
              <h1 className="text-4xl font-bold">{item.price}</h1>
              <p className="font-semibold">{item.batchText}</p>
            </div>
            <h3 className="font-semibold">{item.subtitle}</h3>
          </div>
          <div>
            {item.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Image src={img.src} alt="img" width={12} height={12} />
                <p key={index} className="font-normal">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button className="font-semibold bg-[#1A1A1A] py-3 px-5 w-fit mx-auto cursor-pointer">{item.btn}</button>
      </div>
    </div>
  );
}

export default PricingCard;
