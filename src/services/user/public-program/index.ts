'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */

export const getAllPublicProgram = async (
  page: number = 1,
  limit: number = 1,
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/public-program?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        next: {
          tags: ['PROGRAMM'],
        },
      },
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getPublicProgrammDetails = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/public-program/${id}`,
      {
        method: 'GET',
        next: {
          tags: ['PROGRAMM'],
        },
      },
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
