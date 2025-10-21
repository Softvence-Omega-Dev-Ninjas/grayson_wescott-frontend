'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Step1 from './_components/Step1/Step1';
import Step2 from './_components/Step2/Step2';
import Step3 from './_components/Step3/Step3';
import Stepper from './_components/Stepper/Stepper';

export interface IFormData {
  videoFile: File | null;
  videoLink: string;
  videoName: string;
  duration: string;
  videoDescription: string;
  primaryCategory: string;
  status: string;
  bodyPartTags: string[];
  equipmentTags: string[];
  difficultyLevel: string;
  stepByStepGuide: { value: string }[];
  keyBenefits: { value: string }[];
  commonMistakes: { value: string }[];
  exerciseDetails: {
    equipment: string;
    type: string;
    primaryMuscles: string;
    secondaryMuscles: string;
    caloriesBurn: string;
    restTime: string;
  };
}

const addExerciseDefaultValue = {
  videoFile: null,
  videoLink: '',
  videoName: '',
  duration: '',
  videoDescription: '',
  primaryCategory: '',
  status: '',
  bodyPartTags: [],
  equipmentTags: [],
  difficultyLevel: '',
  stepByStepGuide: [{ value: '' }],
  keyBenefits: [{ value: '' }],
  commonMistakes: [{ value: '' }],
  exerciseDetails: {
    equipment: '',
    type: '',
    primaryMuscles: '',
    secondaryMuscles: '',
    caloriesBurn: '',
    restTime: '',
  },
};

const AddExercisePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [videoId, setVideoId] = useState<string | null>(null);

  const router = useRouter();

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
  const onSubmit = (data: FormData) => {
    console.log('Full Form Data:', data);
    // Here you would send all the data to your database
    // For example:
    // try {
    //   await saveDataToDatabase(data);
    //   setCurrentStep(2);
    // } catch (error) {
    //   console.error("Failed to save data:", error);
    //   // Handle error, maybe show an error message on the UI
    // }
    setCurrentStep(2);
  };

  //Final step handle form done.
  const handleDone = () => {
    router.push('/dashboard/admin/all-exercise');
  };

  const formData = getValues();
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold mb-2">Add Exercise</h1>
        <p className="text-[#F4F5F7] text-base font-medium">
          Upload a new exercise video and add basic information. Step 1 of 3.
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
              onNext={handleNext}
              onBack={handleBack}
              register={register}
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              trigger={trigger}
            />
          )}
          {currentStep === 2 && (
            <Step3
              formData={formData}
              onBack={handleBack}
              onDone={handleDone}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddExercisePage;
