import ProgramCard from "@/components/shared/main/ProgramCard/ProgramCard";
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";
import b1 from "../../../../../assets/whatyouwilldo/b1.png";
import b2 from "../../../../../assets/whatyouwilldo/b2.png";
import b3 from "../../../../../assets/whatyouwilldo/b3.png";
import b4 from "../../../../../assets/whatyouwilldo/b4.png";

function WhatYouWillDo() {
  const data = [
    {
      title: "Raw Strength Gains",
      subtitle: "Add 40-60 lbs to your total through progressive Overload",
      icon: b1,
    },
    {
      title: "Competition Readiness",
      subtitle: "Perfect timing and technique for peak performance",
      icon: b2,
    },
    {
      title: "Mental Confidence",
      subtitle: "Unshakeable confidence under heavy loads",
      icon: b3,
    },
    {
      title: "PR Breakthrough",
      subtitle: "Break through plateaus with periodized training",
      icon: b4,
    },
  ];

  return (
    <div className="space-y-5 max-w-5xl mx-auto  ">
      <SectionHeader title="What You'll Build" />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {data.map((item) => (
          <ProgramCard
            key={item.title}
            title={item.title}
            icon={item.icon.src}
            subtitle={item.subtitle}
          />
        ))}
      </div>
    </div>
  );
}

export default WhatYouWillDo;
