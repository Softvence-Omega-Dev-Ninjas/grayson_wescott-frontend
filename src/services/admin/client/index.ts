/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';

export const getAllClients = async (
  page: number = 1,
  limit: number = 20,
  search: string = '',
) => {
  const token = await getValidToken();
  const url = `${
    process.env.NEXT_PUBLIC_BASE_API
  }/client-analytics?page=${page}&limit=${limit}&search=${search}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ['CLIENT'] },
    });

    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getClientsDetails = async (userId: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/client-analytics/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['CLIENT'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

//Delete client
export const deleteClient = async (userId: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/clients/${userId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    revalidateTag('CLIENT');
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
