export interface IExercise {
  title: string;
  description: string;
  dayOfWeek: string;
  duration: string | number | undefined;
  sets: string;
  reps: string;
  restSeconds: string;
  tempo: string;
  videoUrl: string;
}

export interface IProgramm {
  name: string;
  duration: string | number;
  description: string;
  coachNote: string;
  categories: string[];
  exercises: IExercise[];
}
