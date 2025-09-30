import BaseCard from '@/components/shared/main/BaseCard/BaseCard';
import React from 'react';
import f1 from '../../../../../assets/adonisProtocol/gym.png';
import f2 from '../../../../../assets/adonisProtocol/Frame.png';
import f3 from '../../../../../assets/adonisProtocol/people.png';
import f4 from '../../../../../assets/adonisProtocol/brainstorming.png';
import f5 from '../../../../../assets/adonisProtocol/crown.png';
import { Button } from '@/components/ui/button';

function FivePillars() {
  const data = [
    {
      img: f1.src,
      title: 'Aesthetic Performance',
      description:
        'Build the physique that commands respect and turns heads wherever you go.',
    },
    {
      img: f2.src,
      title: 'Bio-Engineering & Grooming',
      description: 'Optimize your appearance, grooming, and biohacks.',
    },
    {
      img: f3.src,
      title: 'Social Mastery',
      description:
        'Develop magnetic charisma and social intelligence that opens every door.',
    },
    {
      img: f4.src,
      title: 'Mindset & Discipline',
      description:
        'Forge unbreakable mental strength and unwavering self-discipline.',
    },
    {
      img: f5.src,
      title: 'Empire Systems',
      description:
        'Build wealth, influence, and legacy that lasts generations.',
    },
  ];

  return (
    <div className=" py-4 space-y-5">
      <div className="container mx-auto space-y-4 sm:space-y-6 px-2">
        {/* First row  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {data.slice(0, 3).map((item, idx) => (
            <BaseCard key={idx} item={item} />
          ))}
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:max-w-xl lg:max-w-5xl md:mx-auto">
          {data.slice(3, 5).map((item, idx) => (
            <BaseCard key={idx} item={item} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mt-14">
        <Button className="bg-[#B9BDC6] uppercase text-black px-6 py-4 rounded-none hover:bg-[#a5a8ae] text-lg font-medium cursor-pointer">
          Start Your Build
        </Button>
      </div>
    </div>
  );
}

export default FivePillars;
