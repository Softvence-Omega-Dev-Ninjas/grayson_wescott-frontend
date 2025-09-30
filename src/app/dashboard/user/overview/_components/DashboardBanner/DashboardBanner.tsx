import Image from "next/image";
import dashboardBanner from "@/assets/dashboard/excercise-library/dashboardBanner.jpg";
import { Button } from "@/components/ui/button";
const DashboardBanner = () => {
  return (
    <section className="relative w-full h-[200px] md:h-[300px] overflow-hidden rounded-2xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={dashboardBanner.src} // Path to your background image
          alt="Descriptive alt text for the background image"
          fill
          // style={{ objectFit: "cover" }}
          quality={80} // Adjust quality for performance
          priority // Add priority if this is the LCP element
        />
        {/* Dark Overlay */}
        {/* <div className="absolute inset-0 bg-black/50" /> */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full items-center justify-start px-5 md:px-10  text-white">
        <div className="max-w-4xl space-y-2">
          <h1 className="text-xl sm:text-3xl font-bold ">
            Welcome Back, Alex Jhnson
          </h1>
          <p className="text-sm sm:text-lg ">
            Your Build. Your Rules. Execute.
          </p>
          <Button size="sm" className="mt-4 px-3 py-2 text-start">
            Start Today&apos;s Workout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DashboardBanner;
