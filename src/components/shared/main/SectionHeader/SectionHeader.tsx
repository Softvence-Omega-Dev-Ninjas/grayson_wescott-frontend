interface ISectionHeaderProps {
  title: string;
  description?: string;
  onClick?: () => void;
}
const SectionHeader = ({ title, description }: ISectionHeaderProps) => {
  return (
    <div className="py-8">
      <h1 className="text-center font-bold text-xl sm:text-3xl md:text-5xl uppercase text-white">{title}</h1>
      {description && <p className="text-center text-base sm:text-lg md:text-xl font-medium mt-3 text-white/90">{description}</p>}
    </div>
  );
};

export default SectionHeader;
