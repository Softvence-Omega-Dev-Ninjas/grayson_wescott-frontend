/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getValidToken } from '@/lib/verifyToken';
import { ProgramStatus } from '@/types/user-program.types';
import { revalidateTag } from 'next/cache';

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

export const getAssignedProgramsDetails = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/programs/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['PROGRAMM', 'ASSIGNED_PROGRAM'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const handleExcerciseStatusUpdate = async (
  id: string,
  data: any,
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/programs/exercises/${id}/log`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    revalidateTag('ASSIGNED_PROGRAM');
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
