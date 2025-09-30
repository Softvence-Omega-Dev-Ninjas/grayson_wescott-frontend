import HeroBanner from '@/components/shared/main/HeroBanner/HeroBanner';
import logo from '@/assets/home/coaching.png';
import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader';
import { pricing } from '../(home)/_components/PricingSection/PricingSection';
import PricingCard from '@/components/shared/main/PricingCard/PricingCard';
import AdonisProtocol from '../(home)/_components/PricingSection/AdoinsProtocol/AdoinsProtocol';
import AddonPrincingPack from '../(home)/_components/PricingSection/AddonPrincingPack/AddonPrincingPack';
const PricingPage = () => {
  return (
    <div className="mb-28">
      <HeroBanner
        title="Carbon Engines"
        subtitle="Precision training systems built for those who demand excellence. From self-guided programs to elite personal coaching."
        img={logo.src}
      />

      <div>
        <div className="my-16">
          <SectionHeader
            title="Choose Your Track"
            description="Select the configuration that matches your performance requirements"
          />
        </div>

        <div className="container px-3 mx-auto grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6">
          {pricing.map((item, idx) => (
            <PricingCard key={idx} item={item} />
          ))}
        </div>
      </div>

      <AdonisProtocol />
      <AddonPrincingPack />
    </div>
  );
};

export default PricingPage;
