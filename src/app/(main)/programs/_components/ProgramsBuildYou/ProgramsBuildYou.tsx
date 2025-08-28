import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader';
import React from 'react';


function ProgramsBuildYou() {
    const programs = [
        {
            title: "Elite Squat Builder",
            subtitle: "Add 40–80 lbs to your squat in 12 weeks–without wrecking your knees.",
            description: "What's Inside",
            features: [
                "Warm-up & bracing protocols",
                "% waves + deload logic",
                "Mobility pairings (hips/ankles)"
            ],
            footer: "Who It’s For: Intermediate lifters fixing depth, bounce, or knee cave",
            btn: "View Program"
        },
        {
            title: "Elite Deadlift Builder",
            subtitle: "Master posterior-chain density, hinge patterning, and spine-safe set-ups.",
            description: "What's Inside",
            features: [
                "Posterior-chain density work",
                "Hinge patterning drills",
                "Spine-safe set-ups"
            ],
            footer: "Who It’s For: Lifters wanting bulletproof deadlift technique and strength",
            btn: "View Program"
        },
        {
            title: "Elite Overhead Press Builder",
            subtitle: "Perfect scapular rhythm, ribcage control, and lockout authority.",
            description: "What's Inside",
            features: [
                "Scapular rhythm training",
                "Ribcage control techniques",
                "Lockout authority drills"
            ],
            footer: "Who It’s For: Athletes struggling with overhead stability and press strength",
            btn: "View Program"
        },
        {
            title: "Elite Core System",
            subtitle: "Master IAP, anti-rotation, and loaded carry progressions.",
            description: "What's Inside",
            features: [
                "IAP training protocols",
                "Anti-rotation sequences",
                "Loaded carry carry progressions"
            ],
            footer: "Who It’s For: Anyone wanting bulletproof core strength and stability",
            btn: "View Program"
        },
        {
            title: "Daily Mobility Flow",
            subtitle: "12-minute resets with sticky joint sequences that actually work.",
            description: "What's Inside",
            features: [
                "12-minute daily resets",
                "Sticky joint sequences",
                "Movement quality drills"
            ],
            footer: "Who It’s For: Desk workers and athletes needing daily movement resets",
            btn: "View Program"
        },
        {
            title: "Daily Flexibility Flow",
            subtitle: "Active end-range training with splits progression system.",
            description: "What's Inside",
            features: [
                "Active end-range protocols",
                "Splits progression system",
                "Lockout authority drills Range-of-motion assessments"
            ],
            footer: "Who It’s For: Athletes wanting extreme range of motion (optional add-on)",
            btn: "View Program"
        }
    ];

    
  

    return (
        <div className="     text-white py-12 px-4 md:px-8">
            <SectionHeader
                title='Programs that actually build you.'
                description='No fluff. Just execution.'
            />

            <div className='max-w-5xl mx-auto grid md:grid-cols-3 grid-cols-1 gap-8 mt-10'>
                {programs.map((item, index) => (
                    <div
                        key={item.title || index}
                        className='bg-[#151519] border border-gray-700 rounded-lg p-6 space-y-4 flex flex-col justify-between min-h-[450px] transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-lg'
                    >
                        {/* Top section: Title, Subtitle, Description */}
                        <div className='space-y-3'>
                            <h1 className="text-2xl font-bold text-white">{item.title}</h1>
                            <p className="text-gray-300 font-medium">{item.subtitle}</p>
                            <h3 className="text-lg font-semibold mt-4">{item.description}</h3>
                        </div>

                        {/* Features List */}
                        <div className='space-y-2 flex-grow'>
                            {item.features.map((feature, idx) => (
                                <div className='flex items-start gap-2' key={idx}>
                                    
                                    <svg className="w-5 h-5 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <p className="text-gray-200">{feature}</p>
                                </div>
                            ))}
                        </div>

                        {/* Footer and Button */}
                        <div className='space-y-4 pt-4'>
                            <p className="text-sm text-gray-400">{item.footer}</p>
                            <button className="bg-[#B9BDC6] hover:bg-black cursor-pointer text-white font-bold py-2 px-4 rounded-md w-full transition-colors duration-200">
                                {item.btn}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProgramsBuildYou;
