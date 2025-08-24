// import BaseCard from "@/components/shared/main/BaseCard/BaseCard";
// import Container from "@/components/shared/main/Container/Container";

// const PathToPeak = () => {
//   return (
//     <Container>
//       PathToPeak
//       <div className="container mx-auto space-y-4 sm:space-y-6 px-2">
//         {/* First row - 3 cards on md+, 1 card per row on small devices */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
//           <BaseCard />

//           <BaseCard />

//           <BaseCard />
//         </div>

//         {/* Second row - 2 cards centered on md+, 1 card per row on small devices */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:max-w-xl lg:max-w-5xl md:mx-auto">
//           <BaseCard />

//           <BaseCard />
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default PathToPeak;

import BaseCard from "@/components/shared/main/BaseCard/BaseCard";
import Container from "@/components/shared/main/Container/Container";
import signup from "@/assets/home/path_to_peak/signup.svg";
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";

const PathToPeak = () => {
  const firstRow = [
    { title: "Sign Up", description: "Choose your system and get instant access", img: signup },
    { id: 2, title: "Customize", description: "Adjust settings to fit your workflow", img: signup },
    { id: 3, title: "Launch", description: "Get started with your optimized system", img: signup },
  ];

  const secondRow = [
    { id: 4, title: "Track", description: "Monitor your progress over time", img: signup },
    { id: 5, title: "Achieve", description: "Reach your peak performance goals", img: signup },
  ];

  return (
    <Container>
      <SectionHeader title={"Path To Peak"} description={"Get personalized guidance to accelerate your progress and achieve breakthrough results "} />
      <div className="container mx-auto space-y-4 sm:space-y-6 px-2">
        {/* First row - 3 cards on md+, 1 card per row on small devices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {firstRow.map((item, idx) => (
            <BaseCard key={idx} item={item} />
          ))}
        </div>

        {/* Second row - 2 cards centered on md+, 1 card per row on small devices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:max-w-xl lg:max-w-5xl md:mx-auto">
          {secondRow.map((item, idx) => (
            <BaseCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PathToPeak;
