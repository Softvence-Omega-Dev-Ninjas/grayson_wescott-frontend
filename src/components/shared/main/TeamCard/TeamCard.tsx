import Image from 'next/image';

interface TeamProps {
  item: {
    id?: number;
    title: string;
    name: string;
    img: string;
    designation: string;
  };
}

const TeamCard = ({ item }: TeamProps) => {
  return (
    <div className="flex flex-col justify-center gap-4  bg-[#2A2D33] py-8 px-6">
      {/* {item.id && <span className="text-white font-medium text-lg mb-3">{item.id}</span>} */}
      <h1 className="text-white text-2xl font-bold">{item.title}</h1>

      <div className="flex flex-row gap-3 items-center">
        <div>
          <Image
            alt="image"
            className="rounded-full"
            src={item.img}
            width={60}
            height={60}
          />
        </div>
        <div>
          <h1 className="text-white font-bold text-xl">{item.name}</h1>
          <h1 className="text-white/30 font-semibold text-lg">
            {item.designation}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
