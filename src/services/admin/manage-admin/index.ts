'use server';

import { getValidToken } from '@/lib/verifyToken';
import { revalidateTag } from 'next/cache';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createAdmin = async (adminData: any): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/manage-admins/add-admin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adminData),
      },
    );
    revalidateTag('ADMIN');

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const deleteAdmin = async (id: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/manage-admins/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    revalidateTag('ADMIN');
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllAdmins = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/manage-admins`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['ADMIN'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
