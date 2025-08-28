import HeroBanner from "@/components/shared/main/HeroBanner/HeroBanner";
import React from "react";
import logo from "../../../assets/home/adonis.png";
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";
import FivePillars from "./_components/FivePillars/FivePillars";
import WhatYouGet from "./_components/WhatYouWillGet/WhatYouGet";


function AdonisProtocolPage() {
  return (
    <div>
      <HeroBanner
        title="A complete body and mind recalibration—built for those unwilling to settle for less than apex form."
        subtitle="Physique, grooming, social mastery, discipline. Built for men who refuse average."
        img={logo.src}
        button1="Apply for Adonis Protocol"
      />

       <div className=" bg-[#151519] flex justify-center items-center">
        <SectionHeader
          title="The Five Pillars"
          description="Master these foundations to become the man you were meant to be"
        />
      </div>

      <div className="md:py-12">
        <FivePillars/>
      </div>

      <div className="md:py-12">
        <WhatYouGet/>
      </div>

      <div className="md:py-12">
        
      </div>


    </div>
  );
}

export default AdonisProtocolPage;
