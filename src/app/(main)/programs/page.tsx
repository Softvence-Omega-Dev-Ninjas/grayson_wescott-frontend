import HeroBanner from "@/components/shared/main/HeroBanner/HeroBanner";
import logo from "../../../assets/home/program.png";
import CTA from "@/components/shared/main/CTA/CTA";
import img from "../../../assets/home/commonfooter/aboutf.png";
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";
import p1 from '../../../assets/programs/p1.png'
import p2 from '../../../assets/programs/p2.png'
import p3 from '../../../assets/programs/p3.png'
 
import { OverlayCard } from "@/components/shared/main/OverlayCard/OverlayCard";
import ProgramsBuildYou from "./_components/ProgramsBuildYou/ProgramsBuildYou";
 
import WhatYouWillDo from "./_components/ProgramsBuildYou/WhatYouWillDo";
import HowItWorks from "./_components/ProgramsBuildYou/HowItWorks";
import WhatsInclude from "./_components/ProgramsBuildYou/WhatsInclude";
import AccordionSection from "./_components/ProgramsBuildYou/AccordionSection";
const ProgramsPage = () => {

  const data = [
    {
      img:p1.src,
      title:"Periodized Training"
    },
     {
      img:p2.src,
      title:"Measurable Metrics"
    },
     {
      img:p3.src,
      title:"Specialized Tracks"
    }
  ]

  return (
    <div>
      <HeroBanner
        title="Targeted systems engineered for performance that leaves nothing to chance."
        subtitle="High-performance programming and coaching for men who demand results."
        img={img.src}
        button1="START YOUR ENGINE"
      />

    <div className="md:py-12 space-y-5">
      <SectionHeader title="Feature"/>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto">
        {data.map((item)=>(
          <OverlayCard key={item.title} title={item.title} backgroundImage={item.img}/>
        ))}
      </div>

      {/* Program that build you */}

        <div className="md:py-12">
          <ProgramsBuildYou/>
        </div>

{/* what build you */}

       

        <div className="md:py-12 container mx-auto">
          <WhatYouWillDo/>
        </div>

        <div className="md:py-12 container mx-auto">
         <HowItWorks/>
        </div>

        <div className="md:py-12 container mx-auto">
        <WhatsInclude/>
        </div>

        <div className="md:py-12 container mx-auto">
        <AccordionSection/>
        </div>


      
    </div>


    <div className="md:py-12">
            <CTA title="Ready to Peak?" description="Join thousands who've transformed their strength" img={logo.src} btn1="Buy Now" btn2="Add to Cart" />

    </div>
    </div>
  );
};

export default ProgramsPage;
