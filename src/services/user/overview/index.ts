import { getValidToken } from '@/lib/verifyToken';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getUserDashboardStates = async (): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/dashboard`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['ESXERCISE_LIBRARY'],
      },
    });

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
