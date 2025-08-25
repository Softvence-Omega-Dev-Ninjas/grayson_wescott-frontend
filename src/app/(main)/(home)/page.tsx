import HeroBanner from "@/components/shared/main/reusable-banner/HeroBanner";
import img from "@/assets/home/banner.png";
import PathToPeak from "./_components/PathToPeak/PathToPeak";

const HomePage = () => {
  return (
    <div className="text-red-600 bg-red-200 xsm:text-blue-500 xs:text-yellow-500 sm:text-cyan-400 md:text-orange-500 bs:text-pink-500 lg:text-violet-600 xl:text-green-700">
      <HeroBanner
        title="The engine that drives elite performance starts here."
        subtitle="High-performance programming and coaching for men who demand results."
        button1="Start Your Engine"
        button2="Apply Now"
        img={img.src}
      />

      <PathToPeak />
    </div>
  );
};

export default HomePage;
