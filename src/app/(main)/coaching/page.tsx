import HeroBanner from "@/components/shared/main/HeroBanner/HeroBanner";
import logo from "../../../assets/home/coaching.png";
import CoachingThatMovesTheNeedle from "./_components/coachingthatMoves/CoachingThatMovesTheNeedle";
const CoachingPage = () => {
  return (
    <div>
      <HeroBanner
        title="Direct, adaptive oversight. Every weakness addressed before it costs you progress."
        subtitle="High-performance programming and coaching for men who demand results."
        button1="START YOUR ENGINE"
        img={logo.src}
      />

      <div className="md:py-12">
        <CoachingThatMovesTheNeedle/>
      </div>
    </div>
  );
};

export default CoachingPage;
