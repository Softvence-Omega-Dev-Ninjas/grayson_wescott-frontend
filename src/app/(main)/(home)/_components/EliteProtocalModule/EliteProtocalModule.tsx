import BaseCard from '@/components/shared/main/BaseCard/BaseCard';
import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader';

import down from '../../../../../assets/home/eliteprotocol/arrow.png';
import up from '../../../../../assets/home/eliteprotocol/uparrow.png';
import target from '../../../../../assets/home/eliteprotocol/target.png';
import play from '../../../../../assets/home/eliteprotocol/play.png';
import circle from '../../../../../assets/home/eliteprotocol/circle.png';
import { Button } from '@/components/ui/button';

function EliteProtocalModule() {
  const d = [
    {
      img: down.src,
      title: 'Elite Squat Builder',
      description: 'Every rep engineered for precision.',
    },
    {
      img: up.src,
      title: 'Elite Deadlift Builder',
      description: 'Unlock hidden strength potential.',
    },
    {
      img: target.src,
      title: 'Elite Core Builder',
      description: 'Stability weaponized.',
    },
    {
      img: play.src,
      title: 'Daily Mobility Flow',
      description: 'Keep joints free & ready.',
    },
    {
      img: circle.src,
      title: 'DAILY FLEXIBILITY FLOW',
      description:
        'Systems to erase limits, rebuild movement & install strength.',
    },
  ];
  return (
    <div className="bg-black py-8">
      <div className=" py-4 space-y-5">
        <SectionHeader
          title="Elite Protocol Modules"
          description="Systems to erase limits, rebuild movement & install strength."
        />

        <div className="container mx-auto space-y-4 sm:space-y-6 px-2">
          {/* First row  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {d.slice(0, 3).map((item, idx) => (
              <BaseCard key={idx} item={item} />
            ))}
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:max-w-xl lg:max-w-5xl md:mx-auto">
            {d.slice(3, 5).map((item, idx) => (
              <BaseCard key={idx} item={item} />
            ))}
          </div>
          <div className="flex items-center justify-center mt-14">
            <Button className="bg-[#B9BDC6] uppercase text-black px-6 py-4 rounded-none text-lg font-medium hover:bg-[#a5a8ae] cursor-pointer">
              EXPLORE THE COLLECTION
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EliteProtocalModule;
