import PricingCard from '@/components/shared/main/PricingCard/PricingCard';
import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader';
import { Crown, Star, User, Zap } from 'lucide-react';

export const pricing = [
  {
    title: 'Self-Guided Systems',
    tier: 'Tier 1',
    description: 'Complete training programs delivered through Trainerize',
    price: '$299',
    billing: '/month',
    features: [
      'Mobility, Strength & Conditioning Systems.',
      'Full video library access.',
      'Progress tracking.',
      'Automated onboarding.',
      'Monthly auto pay.',
    ],
    buttonText: 'Start Training',
    isEnable: false,
    Icon: Zap,
  },
  {
    title: 'Elite Coaching',
    tier: 'Tier 1',
    description: 'Direct coaching oversight with program adjustments',
    price: '$1,600',
    billing: '/month',
    features: [
      'Weekly program adjustments',
      'In-app messaging',
      'Limited video feedback',
      'Everything in Self-Guided',
    ],
    buttonText: 'Start Training',
    isEnable: true,
    Icon: User,
  },
  {
    title: 'Executive Coaching',
    tier: 'Tier 2',
    description:
      'Enhanced coaching with direct access and lifestyle integration',
    price: '$2,400',
    billing: '/month',
    features: [
      'Everything in Tier 1',
      'Bi-weekly calls with Grayson',
      'Nutrition + lifestyle integration',
      'Faster response priority',
    ],
    buttonText: 'Start Training',
    isEnable: false,
    Icon: Star,
  },
  {
    title: 'Private Adonis Concierge',
    tier: 'Tier 3',
    description: 'Invite-only full lifestyle management',
    price: '$3,500',
    billing: '/month',
    features: [
      'Full Lifestyle management',
      'Training, Nutrition & accountability',
      'Near-direct access to Grayson',
      'Limited client slots available',
    ],
    buttonText: 'Start Training',
    isEnable: false,
    Icon: Crown,
  },
];
function PricingSection() {
  return (
    <div>
      <SectionHeader
        title="Choose Your Track"
        description="Select the configuration that matches your performance requirements"
      />

      <div className="container px-3 mx-auto grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6">
        {pricing.map((item, idx) => (
          <PricingCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

export default PricingSection;
