/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { sendAccessToken } from '@/services/auth';
import { AuthProvider } from '@/types/user.types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaFacebookF } from 'react-icons/fa6';
import { toast } from 'sonner';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export default function FacebookLogin() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [needsEmail, setNeedsEmail] = useState(false);

  useEffect(() => {
    // Load FB SDK
    ((d, s, id) => {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    // Initialize FB SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: false,
        version: 'v17.0',
      });
    };
  }, []);

  const handleLogin = () => {
    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          setAccessToken(response.authResponse.accessToken);
          console.log('Facebook Access Token:', accessToken);
        } else {
          toast.error('Facebook login cancelled or failed.');
        }
      },
      { scope: 'email,public_profile' },
    );
  };

  const handleEmailSubmit = async () => {
    if (!accessToken || !email) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth-social/complete-login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessToken,
            email,
            provider: AuthProvider.FACEBOOK,
          }),
        },
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result?.message || 'Failed to send email');

      // instruct user to check there inbox
      if (result?.data?.needsVerification) {
        toast.success(
          'A link to complete the verification has been sent to your email. Please check your inbox.',
        );
      }
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;

      const res = await sendAccessToken({
        accessToken,
        provider: AuthProvider.FACEBOOK,
      });

      switch (res.step) {
        case 'NEEDS_EMAIL':
          setNeedsEmail(true); // show email input field
          break;

        case 'NEEDS_VERIFICATION':
          toast.success(
            'A link to complete the verification has been sent to your email. Please check your inbox.',
          );
          break;

        case 'LOGGED_IN':
          if (res?.user?.role === 'USER') {
            router.push(`/dashboard/user/overview`);
          }
          if (
            res?.user?.role === 'ADMIN' ||
            res?.user?.role === 'SUPER_ADMIN'
          ) {
            router.push(`/dashboard/admin/overview`);
          }
          break;

        case 'ERROR':
          toast.error(res.error);
          break;
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div>
      <Button
        onClick={handleLogin}
        className="w-9 h-9 bg-white rounded flex items-center justify-center mt-0.5"
      >
        <FaFacebookF className="text-blue-500" />
      </Button>

      {needsEmail && (
        <div className="mt-2 flex flex-col gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <Button onClick={handleEmailSubmit}>Submit Email</Button>
        </div>
      )}
    </div>
  );
}
