import HeroBanner from "@/components/shared/main/reusable-banner/HeroBanner";
import logo from '../../../assets/home/program.png'
const ProgramsPage = () => {
  return <div>
    <HeroBanner
    title="Targeted systems engineered for performance that leaves nothing to chance."
    subtitle="High-performance programming and coaching for men who demand results."
    img={logo.src}
    button1="START YOUR ENGINE"
    />
  </div>;
};

export default ProgramsPage;
