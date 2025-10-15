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
  status?: ProgramStatus;
}) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/programs?page=${page}&limit=${limit}&status=${status}`,
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
