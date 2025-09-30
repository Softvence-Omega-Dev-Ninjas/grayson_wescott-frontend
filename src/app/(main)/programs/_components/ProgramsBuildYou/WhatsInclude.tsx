import ProgramCard from "@/components/shared/main/ProgramCard/ProgramCard";
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";
import b1 from "../../../../../assets/whatyouwilldo/i1.png";
import b2 from "../../../../../assets/whatyouwilldo/i2.png";
import b3 from "../../../../../assets/whatyouwilldo/i3.png";
import b4 from "../../../../../assets/whatyouwilldo/i4.png";

function WhatsInclude() {
  const data = [
    {
      title: "PDF Program + Video Demos",
      subtitle: "Complete 12-week program with exercise demonstrations",
      icon: b1,
    },
    {
      title: "Warm-up Map + Mobility",
      subtitle: "Dynamic warm-ups and targeted mobility routines",
      icon: b2,
    },
    {
      title: "Testing Protocol",
      subtitle: "Standardized testing procedures and PR tracking sheets",
      icon: b3,
    },
    {
      title: "Video Library Access",
      subtitle: "Technique breakdowns and common mistake corrections",
      icon: b4,
    },
  ];

  return (
    <div className="space-y-5 max-w-5xl mx-auto  ">
      <SectionHeader title="What's Included" />

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

export default WhatsInclude;
