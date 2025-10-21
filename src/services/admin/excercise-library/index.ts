'use server';
import { getValidToken } from '@/lib/verifyToken';

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
