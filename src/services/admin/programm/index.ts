/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';

export const createProgramm = async (programmData: any): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/program`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(programmData),
    });

    revalidateTag('PROGRAMM');
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateProgramm = async (
  id: string,
  programmData: any,
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/program/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(programmData),
      },
    );

    revalidateTag('PROGRAMM');
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllProgramms = async (page: number = 1, limit: number = 10) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/program?page=${page}&limit=${limit}`,
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
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const getProgrammsDetails = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/program/${id}`,
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

export const deleteProgram = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/program/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    revalidateTag('PROGRAMM');
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
