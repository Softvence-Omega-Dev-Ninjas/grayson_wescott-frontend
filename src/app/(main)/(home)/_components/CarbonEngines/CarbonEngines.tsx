import { OverlayCard } from '@/components/shared/main/OverlayCard/OverlayCard';
import { Target, RefreshCw, TrendingUp } from 'lucide-react';
import pic1 from '@/assets/home/carbon_engines/pic1.jpg';
import pic2 from '@/assets/home/carbon_engines/pic2.png';
import pic3 from '@/assets/home/carbon_engines/pic3.jpg';
import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader';

export default function CarbonEngines() {
  return (
    <div className="   p-8">
      <div className="container mx-auto space-y-5">
        <SectionHeader title="Why Carbon Engines" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OverlayCard
            icon={<Target size={32} />}
            title="Precision"
            description="Optimize your appearance, grooming, and bio hacks."
            backgroundImage={pic1.src}
          />

          <OverlayCard
            icon={<RefreshCw size={32} />}
            title="Adaptation"
            description="Real-time adjustments before weaknesses cost progress."
            backgroundImage={pic2.src}
          />

          <OverlayCard
            icon={<TrendingUp size={32} />}
            title="Results"
            description="Data, not guesswork; outcomes you can't ignore."
            backgroundImage={pic3.src}
          />
        </div>
      </div>
    </div>
  );
}
