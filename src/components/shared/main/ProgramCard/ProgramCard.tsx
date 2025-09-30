import Image from "next/image";
import React from "react";

const ProgramCard = ({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) => {
  return (
    <div className="flex items-center space-x-3 p-5 bg-[#2A2D33] text-white">
      {/* Icon Box */}
      <div className="bg-gray-300 p-1 flex items-center justify-center w-12 h-12">
        {/* <img className='w-8 h-8' src={icon} alt="" /> */}
        <Image src={icon} alt="icon" width={28} height={28} />
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <div className="font-semibold text-lg">{title}</div>
        <div className="font-normal text-sm text-gray-400">{subtitle}</div>
      </div>
    </div>
  );
};

export default ProgramCard;
