import React from "react";
import img from "../../../../assets/farrow.png";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
export interface IPricingPlan {
  item: {
    title: string;
    tier?: string;
    description: string;
    price: string;
    billing: string;
    features: string[];
    buttonText: string;
    isEnable: boolean;
    Icon: LucideIcon;
  };
}

function PricingCard({ item }: IPricingPlan) {
  const { Icon } = item;
  return (
    <div
      className={`border h-auto ${item.isEnable ? "bg-[#2A2D33]" : ""} transition-all duration-500 ease-in-out 
                hover:scale-105  hover:shadow-xl border-[#B9BDC6] px-8 py-5 space-y-4 min-h-[400px] flex flex-col justify-between text-white`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <span className="w-16 h-16 rounded-full bg-[#FFFFFF66] flex items-center justify-center">
            <Icon />
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 justify-center  text-center">
          <h1 className="text-xl font-bold">{item.title}</h1>
          <span className="text-base font-semibold">Tiar 1</span>
          <p className="font-normal text-base">{item.description}</p>
          <h1 className="text-4xl font-bold my-4">
            {item.price}{" "}
            <span className="text-lg font-medium">{item.billing}</span>
          </h1>
        </div>
        <div>
          {item.features.map((feature, index) => (
            <div
              key={feature}
              className="flex items-center justify-center md:justify-start  gap-2 mt-2"
            >
              {/* <img src={img.src} alt="" /> */}
              <Image src={img.src} alt="image" height={15} width={15} />
              <p key={index} className="font-normal">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button className="font-semibold bg-[#1A1A1A] hover:bg-secondary/60 py-3 px-5 mx-auto cursor-pointer mt-4 w-full md:w-fit ">
        {item.buttonText}
      </button>
    </div>
  );
}

export default PricingCard;
