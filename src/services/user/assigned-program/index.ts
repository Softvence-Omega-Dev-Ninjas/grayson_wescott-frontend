/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getValidToken } from '@/lib/verifyToken';
import { ProgramStatus } from '@/types/user-program.types';

export const getAllUserProgram = async ({
  page,
  limit,
  status,
}: {
  page: number;
  limit: number;
  status?: ProgramStatus; // ✅ make it optional
}) => {
  const token = await getValidToken();

  try {
    // Construct URL with conditional query param
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (status) query.append('status', status);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/programs?${query.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['USER_PROGRAM'],
        },
      },
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
