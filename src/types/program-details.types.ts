import { ICategory } from '@/types/category.types';

export interface IProgramDetails {
  id: string;
  name: string;
  description: string;
  coachNote: string;
  duration: number;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  exercises: IExercise[];
  programCategories: IProgramCategory[];
  userPrograms: IUserProgram[];
}

interface IExercise {
  id: string;
  title: string;
  description: string;
  dayOfWeek:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';
  order: number;
  duration: number;
  reps: number;
  sets: number;
  rest: number;
  tempo: string;
  videoUrl: string;
  programId: string;
  createdAt: string;
  updatedAt: string;
}

interface IProgramCategory {
  id: string;
  programId: string;
  categoryId: string;
  category: ICategory;
}

interface IUserProgram {
  id: string;
  programId: string;
  userId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl?: string;
}
