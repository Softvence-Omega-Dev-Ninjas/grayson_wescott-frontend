import icon1 from "@/assets/about/icon1.svg";
import icon2 from "@/assets/about/icon2.svg";
import icon3 from "@/assets/about/icon3.svg";
import BaseCard from "@/components/shared/main/BaseCard/BaseCard";
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";
const data = [
  {
    img: icon1,
    title: "PRECISION",
    description: "Every movement is calculated. Every rep is measured. Every result is engineered. No guesswork, only science.",
  },
  {
    img: icon2,
    title: "DURABILITY",
    description: "Built to last. Designed to endure. Strength that compounds over decades, not months.",
  },
  {
    img: icon3,
    title: "EVOLUTION",
    description: "Constant refinement. Continuous optimization. Always pushing the boundaries of human potential.",
  },
];
const CorePhilosophy = () => {
  return (
    <div className="bg-primary-100 py-4 space-y-5">
      <SectionHeader title="CORE PHILOSOPHY" description="Three pillars of engineered excellence" />

      <div className="container mx-auto space-y-4 sm:space-y-6 px-2">
        {/* First row  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {data.slice(0, 3).map((item, idx) => (
            <BaseCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CorePhilosophy;
