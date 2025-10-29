'use server';
import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getHyperVideos = async (search: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/library/workouts/hyperhuman?q=${search}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // revalidateTag('ASSIGNED_PROGRAM');
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

//create excercise in library
export const createExcercise = async (excerciseData: any): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/library`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(excerciseData),
    });

    revalidateTag('ESXERCISE_LIBRARY');
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllExcercise = async (
  page: number = 1,
  limit: number = 10,
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/library?page=${page}&limit=${limit}`,
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
export const getExcerciseDetails = async (id: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/library/${id}`,
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
