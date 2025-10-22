'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from '@/lib/verifyToken';

export const getAllExcerciseByUser = async (): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/dashboard/library`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['ESXERCISE_LIBRARY'],
        },
      },
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getExcerciseDetailsByUser = async (id: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/dashboard/library/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['ESXERCISE_LIBRARY'],
        },
      },
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
