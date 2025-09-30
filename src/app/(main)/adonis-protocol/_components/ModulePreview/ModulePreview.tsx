import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader';
import Image from 'next/image';
import img from '../../../../../assets/adonisProtocol/lock.png';

interface TeamProps {
  title: string;

  icon: string;
  description: string;
}

function ModulePreview() {
  const data: TeamProps[] = [
    {
      icon: img.src,
      title: 'Foundation Assessment',
      description: 'Baseline evaluation and goal setting',
    },
    {
      icon: img.src,
      title: 'Physique Architecture',
      description: 'Training principles and program design',
    },
    {
      icon: img.src,
      title: 'Nutrition Mastery',
      description: 'Fuel for optimal performance',
    },
    {
      icon: img.src,
      title: 'Style Foundation',
      description: 'Wardrobe essentials and fit',
    },
    {
      icon: img.src,
      title: 'Grooming Systems',
      description: 'Skincare hair and hygiene protocols',
    },
    {
      icon: img.src,
      title: 'Social Dynamics',
      description: 'Conversation and charisma',
    },
    {
      icon: img.src,
      title: 'Mental Fortitude',
      description: 'Discipline and resilience building',
    },
    {
      icon: img.src,
      title: 'Advanced Aesthetics',
      description: 'Fine-tuning your physique',
    },
    {
      icon: img.src,
      title: 'Elite Networking',
      description: 'Building powerful connections',
    },
    {
      icon: img.src,
      title: 'Wealth Mindset',
      description: 'Financial success principles',
    },
    {
      icon: img.src,
      title: 'Legacy Building',
      description: 'Long-term success strategies',
    },
    {
      icon: img.src,
      title: 'Foundation Assessment',
      description: 'Baseline evaluation and goal setting',
    },
  ];

  return (
    <div className="container mx-auto py-5">
      <SectionHeader
        title="Module Preview"
        description="12 comprehensive modules for complete transformation"
      />

      <div className="max-w-6xl grid mx-auto lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
        {data.map((item, id) => (
          <div key={id} className="space-y-2  bg-[#2A2D33] py-6 px-4">
            {/* {item.id && <span className="text-white font-medium text-lg mb-3">{item.id}</span>} */}

            <div className="flex flex-col gap-2">
              <div>
                <Image
                  alt="image"
                  className="rounded-full"
                  src={item.icon}
                  width={14}
                  height={14}
                />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">{item.title}</h1>
                <h1 className="text-white/60 font-semibold text-lg">
                  {item.description}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModulePreview;
