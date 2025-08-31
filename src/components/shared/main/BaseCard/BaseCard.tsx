import Image from "next/image";

interface IBaseCardProps {
  item: {
    id?: number;
    title?: string;
    description?: string;
    img?: string;
  };
}

const BaseCard = ({ item }: IBaseCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-primary-100 py-8 px-5">
      {item.id && <span className="text-white font-medium text-lg mb-3">{item.id}</span>}
      {item.img && <Image src={item.img} alt={`${item.title} icon`} className="bg-secondary p-1" width={40} height={40} />}
      <h1 className="text-white text-4xl bs:text-3xl xl:text-4xl font-semibold mt-4 text-center">{item.title}</h1>
      {item.description && (
        <p className="text-white text-lg sm:text-xl bs:text-lg xl:text-2xl font-light text-center leading-snug mt-3">{item.description}</p>
      )}
    </div>
  );
};

export default BaseCard;
