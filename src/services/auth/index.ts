/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { TChangePasswordFormData } from '@/app/dashboard/admin/settings/_components/ChangePassword/schema/changePasswordSchema';
import { getValidToken } from '@/lib/verifyToken';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

//Regiter user
export const registerUser = async (userData: Record<string, any>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to register: ${res.statusText}`);
    }

    return await res.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

//Login User
export const loginUser = async (userData: FieldValues) => {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result?.success) {
      // Save token in cookies
      cookieStore.set('accessToken', result?.data?.token);

      // Save user in cookies
      cookieStore.set('user', JSON.stringify(result?.data?.user));
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

//Change Password
export const changePassword = async (
  userData: Partial<TChangePasswordFormData>,
) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    );

    const result = await res.json();
    console.log('+++++++++++++++++++++++++', result);
    return result;
  } catch (error: any) {
    return new Error(error);
  }
};

//Update User
export const updateUser = async (userData: FormData) => {
  const cookieStore = await cookies();
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/update-profile`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: userData,
      },
    );

    const result = await res.json();
    if (result?.success) {
      cookieStore.set('user', JSON.stringify(result?.data));
    }

    return result;
  } catch (error: any) {
    return new Error(error);
  }
};

export const getUserProfile = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/profile`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ['USER_PROFILE'],
        },
      },
    );
    const data = await res.json();
    console.log('daaaaaaaaaaaaaaaataaaaaaaaaaaaaaaa', data);
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

//Get Current User
export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const userCookie = cookieStore.get('user')?.value;

  if (accessToken && userCookie) {
    try {
      const user = JSON.parse(userCookie);
      return { ...user, accessToken };
      return JSON.parse(userCookie);
    } catch (err) {
      console.error('Error parsing user cookie:', err);
      return null;
    }
  }

  return null;
};

export const updateMessagingPreferences = async (preferences: any) => {
  const cookieStore = await cookies();
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/update-preferences`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(preferences),
      },
    );

    const result = await res.json();
    if (result?.success) {
      cookieStore.set('user', JSON.stringify(result?.data));
    }

    return result;
  } catch (err) {
    console.error('❌ Error updating preferences:', err);
    throw err;
  }
};

//Logout User
export const logout = async () => {
  const cookieStore = await cookies();

  // Remove token and user from cookies
  cookieStore.delete('accessToken');
  cookieStore.delete('user');
};

//Verify email
export const verifyEmail = async (data: Record<string, any>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/verify-otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    return await res.json();
  } catch (error: any) {
    return { error: error.message };
  }
};
//Resend Verification mail
export const resendVerificationEmail = async (data: Record<string, any>) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/resend-otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    return await res.json();
  } catch (error: any) {
    return { error: error.message };
  }
};
//Resend Verification mail
export const sendGoogleLogin = async (data: Record<string, any>) => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/google-login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();

    if (result?.success) {
      // Save token in cookies
      cookieStore.set('accessToken', result?.data?.token);

      // Save user in cookies
      cookieStore.set('user', JSON.stringify(result?.data?.user));
    }
    return result;
  } catch (error: any) {
    return { error: error.message };
  }
};

// Send access token for Social Login
export const facebookLogin = async (data: { accessToken: string }) => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth-social/facebook-login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    // Handle non-200 responses
    if (!res.ok) {
      throw new Error(result?.message || 'Facebook login failed');
    }

    // CASE 1: Provider did not return email
    if (result?.data?.needsEmail) {
      return {
        step: 'NEEDS_EMAIL',
        message: result.message,
        provider: result.data.provider,
        providerId: result.data.providerId,
        accessToken: result.data.accessToken,
        name: result.data.name,
        avatarUrl: result.data.avatarUrl,
      };
    }

    // CASE 2: Successful login (user + token returned)
    if (result?.data?.user && result?.data?.token) {
      // Save token in cookies
      cookieStore.set('accessToken', result?.data?.token);

      // Save user in cookies
      cookieStore.set('user', JSON.stringify(result?.data?.user));

      return {
        step: 'LOGGED_IN',
        message: result.message,
        user: result.data.user,
        token: result.data.token,
        isVerified: result.data.isVerified,
      };
    }

    // Fallback: unexpected structure
    throw new Error('Unexpected response format');
  } catch (error: any) {
    console.error('Facebook login error:', error);
    return {
      step: 'ERROR',
      error: error.message || 'Something went wrong',
    };
  }
};

// Send access token with email
export const twitterLogin = async (data: {
  oauthToken: string;
  oauthTokenSecret: string;
  oauthVerifier: string;
}) => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth-social/twitter-login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    // Handle non-200 responses
    if (!res.ok) {
      throw new Error(result?.message || 'Twitter login failed');
    }

    // CASE 1: Provider did not return email
    if (result?.data?.needsEmail) {
      return {
        step: 'NEEDS_EMAIL',
        message: result.message,
        provider: result.data.provider,
        providerId: result.data.providerId,
        accessToken: result.data.accessToken,
        name: result.data.name,
        avatarUrl: result.data.avatarUrl,
      };
    }

    // CASE 2: Successful login (user + token returned)
    if (result?.data?.user && result?.data?.token) {
      // Save token in cookies
      cookieStore.set('accessToken', result?.data?.token);

      // Save user in cookies
      cookieStore.set('user', JSON.stringify(result?.data?.user));

      return {
        step: 'LOGGED_IN',
        message: result.message,
        user: result.data.user,
        token: result.data.token,
        isVerified: result.data.isVerified,
      };
    }

    // Fallback: unexpected structure
    throw new Error('Unexpected response format');
  } catch (error: any) {
    console.error('Twitter login error:', error);
    return {
      step: 'ERROR',
      error: error.message || 'Something went wrong',
    };
  }
};
