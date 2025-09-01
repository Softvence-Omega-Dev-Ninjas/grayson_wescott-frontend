import HeroBanner from "@/components/shared/main/HeroBanner/HeroBanner";
import img from "@/assets/home/banner.png";
import PathToPeak from "./_components/PathToPeak/PathToPeak";
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";

import CarbonEngines from "./_components/CarbonEngines/CarbonEngines";
import InsideTheProtocol from "./_components/InsideTheProtocol/InsideTheProtocol";
import EliteProtocalModule from "./_components/EliteProtocalModule/EliteProtocalModule";
import TestimonialSectio from "../TestimonialSection/TestimonialSectio";
import CtaSection from "./_components/CTASection/CtaSection";
import TeamSection from "./_components/TeamSection/TeamSection";
import PricingSection from "./_components/PricingSection/PricingSection";
import AccordionSection from "./_components/Accordion/AccordionSection";
import StartBuild from "./_components/StartBuild/StartBuild";
import profile1 from "@/assets/home/profile4.jpg";
import profile2 from "@/assets/home/profile5.jpg";
import profile3 from "@/assets/home/profile1.png";
import profile4 from "@/assets/home/profile2.png";
import profile5 from "@/assets/home/profile3.png";

const users = [
  {
    id: 1,
    user: profile1,
  },
  {
    id: 2,
    user: profile2,
  },
  {
    id: 3,
    user: profile3,
  },
  {
    id: 4,
    user: profile4,
  },
  {
    id: 5,
    user: profile5,
  },
];
const HomePage = () => {
  return (
    <div className="pb-20 ">
      <HeroBanner
        title="The engine that drives elite performance starts here."
        subtitle="High-performance programming and coaching for men who demand results."
        button1="Start Your Engine"
        button2="Apply Now"
        img={img.src}
        users={users}
      />

      <div className=" bg-[#151519] flex justify-center items-center">
        <SectionHeader
          title="Strength Isn’t a Trend. It’s a Foundation"
          description="Carbon Engines is the architecture of high performance science-rooted, field-tested, no fluff"
        />
      </div>

      {/* <OverlayCard 
      title=""
      description=""
      backgroundImage=""
      icon/> */}
      <div className="md:my-12">
        <CarbonEngines />
      </div>
      <div className="md:my-12">
        <PathToPeak />
      </div>

      <div className="md:py-12">
        <InsideTheProtocol />
      </div>

      <div className="md:py-12">
        <TestimonialSectio />
      </div>

      <div className="md:py-12">
        <EliteProtocalModule />
      </div>

      <div className="md:py-12">
        <CtaSection />
      </div>

      <div className="md:py-12">
        <TeamSection />
      </div>

      <div className="md:py-12">
        <PricingSection />
      </div>

      <div className="md:py-12">
        <AccordionSection />
      </div>

      <div className="md:py-12">
        <StartBuild />
      </div>
    </div>
  );
};

export default HomePage;
