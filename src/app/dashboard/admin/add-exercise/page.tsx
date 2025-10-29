'use client';
import { createExcercise } from '@/services/admin/excercise-library';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Step1 from './_components/Step1/Step1';
import Step2 from './_components/Step2/Step2';
import Step3 from './_components/Step3/Step3';
import Stepper from './_components/Stepper/Stepper';

export interface IFormData {
  title: string;
  duration: string;
  description: string;
  bodyPartTags: string[];
  equipmentTags: string[];
  difficulty: string;
  steps: { value: string }[];
  keyBenefits: { value: string }[];
  commonMistakes: { value: string }[];
  equipment: string;
  type: string;
  primaryMuscle: string;
  secondaryMuscle: string;
  caloriesBurned: string;
}

const addExerciseDefaultValue: IFormData = {
  title: '',
  duration: '',
  description: '',
  bodyPartTags: [],
  equipmentTags: [],
  difficulty: '',
  steps: [{ value: '' }],
  keyBenefits: [{ value: '' }],
  commonMistakes: [{ value: '' }],
  equipment: '',
  type: '',
  primaryMuscle: '',
  secondaryMuscle: '',
  caloriesBurned: '',
};

const AddExercisePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const router = useRouter();

  //Handle form state.
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<IFormData>({
    defaultValues: addExerciseDefaultValue,
  });

  //Handle Next Step
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  //Handle Previous Step
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  useEffect(() => {
    console.log('Video ID updated:', videoId);
  }, [videoId]);

  //Handle Form Submission
  const onSubmit = async (data: IFormData) => {
    const steps = data.steps?.map((step) => step.value) || [];
    const keyBenefits = data.keyBenefits?.map((benefit) => benefit.value) || [];
    const commonMistakes =
      data.commonMistakes?.map((mistake) => mistake.value) || [];

    const formattedData = {
      ...data,
      steps,
      keyBenefits,
      commonMistakes,
      workoutId: videoId,
    };
    setLoading(true);
    try {
      const res = await createExcercise(formattedData);
      if (res?.success) {
        setCurrentStep(2);
      }
    } catch (error) {
      console.error('Failed to save data:', error);
      // Handle error, maybe show an error message on the UI
    } finally {
      setLoading(false);
    }
  };

  //Final step handle form done.
  // const handleDone = () => {
  //   router.push('/dashboard/admin/all-exercise');
  // };

  const formData = getValues();
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold mb-2">Add Exercise</h1>
        <p className="text-[#F4F5F7] text-base font-medium">
          Upload a new exercise video and add basic information. Step{' '}
          {currentStep + 1} of 3.
        </p>
      </div>
      <div className="py-20">
        <Stepper currentStep={currentStep} />
        <div className="mt-8">
          {currentStep === 0 && (
            <Step1
              onNext={handleNext}
              register={register}
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              setVideoId={setVideoId}
            />
          )}
          {currentStep === 1 && (
            <Step2
              // onDone={handleDone}
              onBack={handleBack}
              register={register}
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              trigger={trigger}
              loading={loading}
            />
          )}
          {currentStep === 2 && (
            <Step3
              formData={formData}
              onBack={handleBack}
              // onDone={handleDone}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddExercisePage;
