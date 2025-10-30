/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { getValidToken } from '@/lib/verifyToken';

export const getUserProgress = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/programs/progress/tracking`,
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
export const getWorkoutHistory = async (
  page: number = 1,
  limit: number = 1,
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/programs/workout/history?page=${page}&limit=${limit}`,
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
export const getMessages = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/dashboard/messages/notifications/me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // next: {
        //   tags: ['PROGRAMM'],
        // },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
export const getNotification = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/dashboard/notifications/me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // next: {
        //   tags: ['PROGRAMM'],
        // },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
