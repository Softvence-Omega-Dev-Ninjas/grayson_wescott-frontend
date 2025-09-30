import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader';
import b1 from '../../../../../assets/whatyouwilldo/1.png';
import b2 from '../../../../../assets/whatyouwilldo/2.png';
import b3 from '../../../../../assets/whatyouwilldo/3.png';

function HowItWorks() {
  const data = [
    {
      id: 1,
      icon: b1,
      title: 'Weeks 1-4: Foundation & Patterning',
      subtitle:
        'Build movement quality and establish training rhythm with moderate intensity',
    },
    {
      id: 2,
      icon: b2,
      title: 'Weeks 5-8: Overload & Density',
      subtitle:
        'Increase training load and volume to drive strength adaptations',
    },
    {
      id: 3,
      icon: b3,
      title: 'Weeks 9-12: Peaking & Test',
      subtitle:
        'Taper volume while maintaining intensity for competition readiness',
    },
    {
      icon: b3,
      title: 'Deload Logic',
      subtitle:
        'Programmed deloads every 4th week at 60-70% intensity to prevent overreaching',
    },
  ];

  return (
    <div className="space-y-5 max-w-5xl mx-auto  ">
      <SectionHeader title="How It Works  " />

      <div className="space-y-5">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-3 p-5 bg-[#2A2D33] text-white"
          >
            {/* Icon Box */}
            {item.id && (
              <div className="bg-gray-300 p-1 flex items-center justify-center w-12 h-12 text-3xl font-bold text-black">
                {/* <img className='w-8 h-8' src={icon} alt="" /> */}
                {item.id}
              </div>
            )}

            {/* Text Content */}
            <div className="flex flex-col">
              <div className="font-semibold text-lg">{item.title}</div>
              <div className="font-normal text-sm text-[#D1D5DB]">
                {item.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
