interface ExerciseStep {
  step: number;
  title: string;
  description: string;
}

interface ExerciseStepsProps {
  steps: ExerciseStep[];
}

export function ExerciseSteps({ steps }: ExerciseStepsProps) {
  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-white">Exercise Steps</h3>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.step} className="bg-primary-200 border border-secondary  p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {step.step}
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
