import HeroBanner from "@/components/shared/main/HeroBanner/HeroBanner";
import img from "../../../assets/home/aboutbanner.png";
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";
import BaseCard from "@/components/shared/main/BaseCard/BaseCard";
import { pricing } from "../(home)/_components/PricingSection/PricingSection";
import PricingCard from "@/components/shared/main/PricingCard/PricingCard";
import CarbonValues from "./_components/CarbonValues/CarbonValues";
import CarbonApproach from "./_components/CarbonApproach/CarbonApproach";
import CorePhilosophy from "./_components/CorePhilosophy/CorePhilosophy";
import TestimonialSectio from "../TestimonialSection/TestimonialSectio";
import CTA from "@/components/shared/main/CTA/CTA";
import aboutImage from "@/assets/about/aboutSideBg.png";
const workWithData = [
  { title: "Athletes chasing dominance in their sport" },
  { title: "High performers demanding strength that matches their ambition" },
  { title: "Fighters who live for precision under fatigue" },
  { title: "Those who expect elite, not average" },
];

const AboutPage = () => {
  return (
    <div>
      <HeroBanner
        title="Two decades of precision. Thousands transformed. One uncompromising standard"
        subtitle="Carbon Engines was built for those who refuse to accept average. Our mission: engineer bodies that dominate under pressure inside the gym and beyond. Every system is designed to eliminate weakness, maximize strength, and create relentless performance."
        button1="Join the Legacy"
        img={img.src}
      />

      <div>
        <div className="py-16">
          <SectionHeader title="Who We Work With" />
        </div>
        <div className="container mx-auto space-y-4 sm:space-y-6 px-2">
          {/* First row  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {workWithData.slice(0, 3).map((item, idx) => (
              <BaseCard key={idx} item={item} />
            ))}
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1  gap-4 sm:gap-6 md:max-w-lg  md:mx-auto">
            {workWithData.slice(3, 5).map((item, idx) => (
              <BaseCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-28 space-y-10">
        <SectionHeader title="Choose Your Track" description="Select the configuration that matches your performance requirements" />

        <div className="container px-3 mx-auto grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6">
          {pricing.map((item, idx) => (
            <PricingCard key={idx} item={item} />
          ))}
        </div>
      </div>
      <div className="mt-28 space-y-10">
        <SectionHeader title="THE CARBON APPROACH" description="Scientific methodology meets engineered precision." />

        <CarbonApproach />
      </div>
      <div className="mt-28 space-y-10">
        <SectionHeader title="Carbon Values" description="THE FOUNDATION OF EVERYTHING WE BUILD" />

        <CarbonValues />
      </div>

      <div className="mt-28 space-y-10">
        <CorePhilosophy />
      </div>
      <div className="mt-28 space-y-10">
        <TestimonialSectio />
      </div>
      <div className="my-28 space-y-10">
        <CTA
          title="READY TO BE ENGINEERED?"
          description="Join the elite. Become unbreakable. Start your transformation."
          img={aboutImage.src}
          btn1="START YOUR ENGINE"
        />
      </div>
    </div>
  );
};

export default AboutPage;
