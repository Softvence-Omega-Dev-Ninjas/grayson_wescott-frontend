import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader';

const AddonPrincingPack = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-10 px-3">
      <div className="text-center mb-12">
        <SectionHeader
          title="Enhance Your Experience"
          description="Optional add-ons to complement your chosen coaching tier"
        />
      </div>

      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full max-w-6xl">
        {/* Card 1 */}
        <div className="flex-1 bg-primary-200 border border-secondary p-6 sm:p-8 flex flex-col items-start">
          <h2 className="text-2xl  font-semibold">Nutrition Coaching</h2>
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-bold">$500</span>
            <span className="text-xl text-gray-400">/month</span>
          </div>
          <button className="w-full mt-8 lg:mt-6 bg-transparent text-gray-100 border border-[#F4F5F7] py-3 sm:py-4 transition-colors text-lg tracking-wider cursor-pointer">
            Start Training
          </button>
        </div>

        {/* Card 2 */}
        <div className="flex-1 bg-primary-200 border border-secondary p-6 sm:p-8 flex flex-col items-start">
          <h2 className="text-2xl  font-semibold">
            Mobility/Flexibility Bundle
          </h2>
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-bold">$299</span>
            <span className="text-xl text-gray-400">/month</span>
          </div>
          <button className="w-full mt-8 lg:mt-6 bg-transparent text-gray-100 border border-[#F4F5F7] py-3 sm:py-4 transition-colors text-lg tracking-wider cursor-pointer">
            Start Training
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddonPrincingPack;
