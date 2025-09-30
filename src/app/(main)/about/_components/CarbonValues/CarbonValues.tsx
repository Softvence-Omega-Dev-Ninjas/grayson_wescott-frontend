import Image from "next/image";
import pic1 from "@/assets/about/pic1.jpg";
import pic2 from "@/assets/about/pic2.jpg";
import pic3 from "@/assets/about/pic3.jpg";
import pic4 from "@/assets/about/pic4.jpg";
const sections = [
  {
    title: "UNCOMPROMISING DISCIPLINE",
    description:
      "EXCELLENCE IS NOT AN ACT, BUT A HABIT. WE DEMAND PRECISION IN EVERY DETAIL, CONSISTENCY IN EVERY SESSION, AND COMMITMENT TO THE PROCESS ABOVE ALL ELSE.",
    image: pic1.src,
    layout: "text-left", // Text on the left, image on the right
  },
  {
    title: "ENGINEERED RESILIENCE",
    description:
      "STRENGTH IS NOT JUST PHYSICAL; IT'S MENTAL, EMOTIONAL, AND SPIRITUAL. WE ARE TRAINED TO THRIVE UNDER PRESSURE AND EMERGE STRONGER FROM EVERY CHALLENGE.",
    image: pic2.src,
    layout: "image-left", // Image on the left, text on the right
  },
  {
    title: "RELENTLESS EXCELLENCE",
    description:
      "GOOD ENOUGH IS THE ENEMY OF GREATNESS. WE PURSUE PERFECTION IN EVERY ASPECT OF TRAINING, FROM TECHNIQUE TO MINDSET TO LIFESTYLE INTEGRATION.",
    image: pic3.src,
    layout: "text-left",
  },
  {
    title: "CONTINUOUS INNOVATION",
    description:
      "THE FUTURE OF STRENGTH IS WRITTEN BY THOSE WHO DARE TO REDEFINE IT. WE CONSTANTLY EVOLVE OUR METHODS, EMBRACING CUTTING-EDGE SCIENCE AND TECHNOLOGY.",
    image: pic4.src,
    layout: "image-left",
  },
];
const CarbonValues = () => {
  return (
    <div className="bg-black text-white font-sans min-h-screen px-4 py-12 md:py-24 flex flex-col items-center">
      {/* Grid of value sections */}
      <div className="container mx-auto space-y-10 md:space-y-10">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col bs:ml-20 md:flex-row items-center gap-8 ${
              section.layout === "image-left" ? "md:flex-row-reverse justify-center" : "justify-start "
            }`}
          >
            {/* Image container */}
            <div className={` flex item-center ${section.layout === "image-left" ? "justify-start" : "justify-end"} `}>
              <Image
                src={section.image}
                alt={section.title}
                width={300}
                height={300}
                className="w-full md:w-1/2 h-full object-cover transition-transform duration-500 ease-in-out "
              />
            </div>

            {/* Text container */}
            <div className="w-full md:w-1/2 px-2 md:px-0  text-center md:text-left">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-widest mb-4">{section.title}</h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarbonValues;
