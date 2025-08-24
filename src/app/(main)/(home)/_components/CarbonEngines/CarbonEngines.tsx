import { OverlayCard } from "@/components/shared/main/OverlayCard/OverlayCard";
import { Target, RefreshCw, TrendingUp } from "lucide-react";
import pic1 from "@/assets/home/carbon_engines/pic1.jpg";

export default function CarbonEngines() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Reusable Card Component</h1>

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
            backgroundImage={pic1.src}
          />

          <OverlayCard
            icon={<TrendingUp size={32} />}
            title="Results"
            description="Data, not guesswork; outcomes you can't ignore."
            backgroundImage={pic1.src}
          />
        </div>
      </div>
    </div>
  );
}
