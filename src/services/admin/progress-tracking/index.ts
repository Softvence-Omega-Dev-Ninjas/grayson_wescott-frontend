/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getValidToken } from '@/lib/verifyToken';

export const getProgressTracking = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/progress/stats`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['PROGRAMM'],
        },
      },
    );
    const data = await res.json();
    console.dir(data);
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
