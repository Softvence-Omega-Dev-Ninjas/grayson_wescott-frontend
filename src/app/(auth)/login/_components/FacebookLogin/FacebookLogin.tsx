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
      { scope: 'email,public_profile' }, // permissions you need
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        const res = await sendAccessToken({
          accessToken,
          provider: AuthProvider.FACEBOOK,
        });

        switch (res.step) {
          case 'NEEDS_EMAIL':
            // open modal to collect email
            break;
          case 'NEEDS_VERIFICATION':
            toast.success(
              'An Link to complete the verification has send to you email. Pleas check your inbox.',
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
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <Button
      onClick={handleLogin}
      className="w-9 h-9 bg-white rounded flex items-center justify-center mt-0.5"
    >
      <FaFacebookF className="text-blue-500" />
    </Button>
  );
}
