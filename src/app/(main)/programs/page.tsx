import HeroBanner from "@/components/shared/main/HeroBanner/HeroBanner";
import logo from "../../../assets/home/program.png";
import CTA from "@/components/shared/main/CTA/CTA";
import img from "../../../assets/home/commonfooter/aboutf.png";
const ProgramsPage = () => {
  return (
    <div>
      <HeroBanner
        title="Targeted systems engineered for performance that leaves nothing to chance."
        subtitle="High-performance programming and coaching for men who demand results."
        img={img.src}
        button1="START YOUR ENGINE"
      />
      <CTA title="Ready to Peak?" description="Join thousands who've transformed their strength" img={logo.src} btn1="Buy Now" btn2="Add to Cart" />
    </div>
  );
};

export default ProgramsPage;
