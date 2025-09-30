import React from "react";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdonisProtocol = () => {
  const features = [
    "Volt AI performance assessments",
    "Custom program architecture",
    "Exclusive Adonis group access",
    "Executive-level direct access",
  ];

  return (
    <div className="flex justify-center items-center my-16">
      <div className="w-full container mx-3 bg-primary-200 p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row items-center lg:items-start space-y-10 lg:space-y-0 lg:space-x-16">
        {/* Left Section */}
        <div className="flex-1 flex flex-col items-center  text-center space-y-4">
          <div className="flex flex-col items-center lg:items-start space-y-2">
            {/* Crown Icon */}
            <div className="flex items-center justify-center w-full mb-6">
              <span className="w-16 h-16 rounded-full bg-[#FFFFFF66] flex items-center justify-center">
                <Crown />
              </span>
            </div>
            {/* Flagship Program Badge */}
            <div className="bg-[#B9BDC6] text-gray-700 text-xs px-4 py-1 uppercase tracking-wider font-semibold">Flagship Program</div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4">The Adonis Protocol</h1>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">The pinnacle of performance optimization • Invitation only</p>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            $10,000<span className="text-xl sm:text-2xl text-gray-200 font-normal">/month</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 lg:mb-2">What’s Included:</h2>
          <ul className="space-y-4 w-full mt-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center justify-center lg:justify-start space-x-3 text-sm sm:text-base w-full">
                <Check className="h-4 w-4 text-gray-200 font-medium mt-1 sm:mt-0 flex-shrink-0" />
                <span className="text-gray-200">{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-8 lg:mt-6 bg-transparent text-gray-100 border border-[#F4F5F7] py-3 sm:py-4 transition-colors text-lg tracking-wider cursor-pointer">
            Apply for Invitation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdonisProtocol;
