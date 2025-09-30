import React from 'react';

const CarbonApproach = () => {
  return (
    <div className="container mx-auto max-w-7xl text-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 justify-center">
        {/* Card 01 */}
        <div className=" border border-gray-800 p-8 text-center flex flex-col justify-center min-h-[250px]">
          <h3 className="text-5xl font-extrabold mb-2">01</h3>
          <h4 className="text-2xl font-bold tracking-wide mb-2">ASSESSMENT</h4>
          <p className="text-sm leading-relaxed text-gray-200">
            COMPREHENSIVE ANALYSIS OF MOVEMENT PATTERNS, STRENGTH BASELINES, AND
            INDIVIDUAL BIOMECHANICS.
          </p>
        </div>
        {/* Card 02 */}
        <div className="border border-gray-800 p-8 text-center flex flex-col justify-center min-h-[250px]">
          <h3 className="text-5xl font-extrabold  mb-2">02</h3>
          <h4 className="text-2xl font-bold tracking-wide mb-2">DESIGN</h4>
          <p className="text-sm leading-relaxed text-gray-200">
            CUSTOM PROGRAM ARCHITECTURE BASED ON SCIENTIFIC PRINCIPLES AND
            INDIVIDUAL REQUIREMENTS.
          </p>
        </div>
        {/* Card 04 */}
        <div className="border border-gray-800 p-8 text-center flex flex-col justify-center min-h-[250px]">
          <h3 className="text-5xl font-extrabold mb-2">04</h3>
          <h4 className="text-2xl font-bold tracking-wide mb-2">EVOLUTION</h4>
          <p className="text-sm leading-relaxed text-gray-200">
            CONTINUOUS REFINEMENT BASED ON PERFORMANCE DATA AND PHYSIOLOGICAL
            ADAPTATION.
          </p>
        </div>
        {/* Card 03 */}
        <div className="border border-gray-800 p-8 text-center flex flex-col justify-center min-h-[250px]">
          <h3 className="text-5xl font-extrabold mb-2">03</h3>
          <h4 className="text-2xl font-bold tracking-wide mb-2">EXECUTION</h4>
          <p className="text-sm leading-relaxed text-gray-200">
            PRECISE IMPLEMENTATION WITH CONSTANT MONITORING AND REAL-TIME
            ADJUSTMENTS.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <button className=" bg-[#B9BDC6] text-primary-200 py-3 px-8 font-bold tracking-wider text-lg hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
          Train with Precision
        </button>
      </div>
    </div>
  );
};

export default CarbonApproach;
