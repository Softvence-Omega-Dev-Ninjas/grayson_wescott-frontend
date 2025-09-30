import React from 'react';

// A reusable Stepper component for the visual progress bar
const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Video Upload', 'Categories', 'Review'];
  return (
    <div className="flex items-center justify-center mb-8 w-full max-w-7xl px-4 mx-auto">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {/* Step Circle */}
          <div
            className={`flex font-bold text-xl items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-300
              ${currentStep >= index ? 'bg-white text-black border-white' : 'border-gray-500 text-gray-500'}
            `}
          >
            {index + 1}
          </div>
          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 transition-colors duration-300
                ${currentStep > index ? 'bg-white' : 'bg-gray-500'}
              `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default Stepper;
