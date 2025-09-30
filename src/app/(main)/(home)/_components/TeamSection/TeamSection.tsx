import TeamCard from "@/components/shared/main/TeamCard/TeamCard";
import pic1 from "../../../../../assets/TeamMember/pic1.png";
import pic2 from "../../../../../assets/TeamMember/pic2.png";
import pic3 from "../../../../../assets/TeamMember/pic3.png";
import pic4 from "../../../../../assets/TeamMember/pic4.png";
import pic5 from "../../../../../assets/TeamMember/pic5.png";
import pic6 from "../../../../../assets/TeamMember/pic6.png";

function TeamSection() {
  const team = [
    {
      img: pic1.src,
      title:
        "Carbon Engines didn't just change my physique--it rebuilt my life.",
      name: "Marcus Chen",
      designation: "Tech Executive",
    },
    {
      img: pic2.src,
      title:
        "Carbon Engines didn't just change my physique--it rebuilt my life.",
      name: "Marcus Chen",
      designation: "Tech Executive",
    },
    {
      img: pic3.src,
      title:
        "Carbon Engines didn't just change my physique--it rebuilt my life.",
      name: "Marcus Chen",
      designation: "Tech Executive",
    },
    {
      img: pic4.src,
      title:
        "Carbon Engines didn't just change my physique--it rebuilt my life.",
      name: "Marcus Chen",
      designation: "Tech Executive",
    },
    {
      img: pic5.src,
      title:
        "Carbon Engines didn't just change my physique--it rebuilt my life.",
      name: "Marcus Chen",
      designation: "Tech Executive",
    },
    {
      img: pic6.src,
      title:
        "Carbon Engines didn't just change my physique--it rebuilt my life.",
      name: "Marcus Chen",
      designation: "Tech Executive",
    },
  ];
  return (
    <div className="bg-[#1A1A1A]">
      <div className="container mx-auto space-y-4 sm:space-y-6 px-2 py-12 ">
        {/* First row  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {team.slice(0, 3).map((item, idx) => (
            <TeamCard key={idx} item={item} />
          ))}
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:max-w-xl lg:max-w-5xl md:mx-auto">
          {team.slice(3, 5).map((item, idx) => (
            <TeamCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamSection;
