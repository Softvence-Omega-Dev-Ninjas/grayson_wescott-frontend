// import signup from "@/assets/home/path_to_peak/signup.svg";
// import Image from "next/image";
// interface IBaseCardProps {
//   item: {
//     id: Number;
//     title?: String;
//     description?: String;
//     img?: any;
//   };
// }
// const BaseCard = () => {
//   return (
//     <div className="flex flex-col items-center justify-center bg-primary-100 py-8 px-5">
//       <span className="text-white font-medium text-lg mb-3">1</span>
//       <Image src={signup} alt="signup icon" className="bg-secondary p-1" width={40} height={40} />
//       <h1 className="text-white text-4xl bs:text-3xl xl:text-4xl font-semibold mt-4">Sign Up</h1>
//       <p className="text-white text-lg sm:text-xl bs:text-lg xl:text-2xl font-light text-center leading-snug mt-3">
//         Choose your system and get instant access{" "}
//       </p>
//     </div>
//   );
// };

// export default BaseCard;

import Image from "next/image";

interface IBaseCardProps {
  item: {
    id?: number;
    title?: string;
    description?: string;
    img?: any;
  };
}

const BaseCard = ({ item }: IBaseCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-primary-100 py-8 px-5">
      {item.id && <span className="text-white font-medium text-lg mb-3">{item.id}</span>}
      <Image src={item.img} alt={`${item.title} icon`} className="bg-secondary p-1" width={40} height={40} />
      <h1 className="text-white text-4xl bs:text-3xl xl:text-4xl font-semibold mt-4">{item.title}</h1>
      <p className="text-white text-lg sm:text-xl bs:text-lg xl:text-2xl font-light text-center leading-snug mt-3">{item.description}</p>
    </div>
  );
};

export default BaseCard;
