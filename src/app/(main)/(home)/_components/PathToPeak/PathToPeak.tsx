import BaseCard from "@/components/shared/main/BaseCard/BaseCard";
import Container from "@/components/shared/main/Container/Container";
import signupIcon from "@/assets/home/path_to_peak/signup.svg";
import trophieIcon from "@/assets/home/path_to_peak/trophieIcon.svg";
import assesmentIcon from "@/assets/home/path_to_peak/assesmentIcon.svg";
import gymIcon from "@/assets/home/path_to_peak/gymIcon.svg";
import adaptiveIcon from "@/assets/home/path_to_peak/adaptiveIcon.svg";
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";
import { Button } from "@/components/ui/button";

const PathToPeak = () => {
  const data = [
    { id: 1, title: "Sign Up", description: "Choose your system and get instant access", img: signupIcon.src },
    { id: 2, title: "Assessment", description: "We measure your baseline to build your plan", img: assesmentIcon.src },
    { id: 3, title: "Program Launch", description: "Begin your personalized, periodized training", img: gymIcon.src },
    { id: 4, title: "Adaptive Oversight", description: "Your coach adjusts in real-time for maximum results", img: adaptiveIcon.src },
    { id: 5, title: "Peak Performance", description: "Hit your goals with measurable, lasting outcomes", img: trophieIcon.src },
  ];

  return (
    <div className="bg-black py-8">
      <Container>
       <div className="space-y-5"> <SectionHeader
          title={"Path To Peak"}
          description={"Get personalized guidance to accelerate your progress and achieve breakthrough results "}
        />
        <div className="container mx-auto space-y-4 sm:space-y-6 px-2">
          {/* First row  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {data.slice(0, 3).map((item, idx) => (
              <BaseCard key={idx} item={item} />
            ))}
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:max-w-xl lg:max-w-5xl md:mx-auto">
            {data.slice(3, 5).map((item, idx) => (
              <BaseCard key={idx} item={item} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mt-14">
          <Button className="bg-[#B9BDC6] uppercase text-black px-6 py-4 rounded-none hover:bg-[#a5a8ae] cursor-pointer">Start Your Build</Button>
        </div></div>
      </Container>
    </div>
  );
};

export default PathToPeak;
