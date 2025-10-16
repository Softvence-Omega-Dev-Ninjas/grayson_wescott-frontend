/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import { facebookLogin } from '@/services/auth';
import { useRouter } from 'next/navigation';
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
  const { setUser, setIsLoading } = useUser();

  // Load and init FB SDK
  useEffect(() => {
    ((d, s, id) => {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

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
        } else {
          toast.error('Facebook login cancelled or failed.');
        }
      },
      { scope: 'email,public_profile' },
    );
  };

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      const res = await facebookLogin({ accessToken });

      switch (res.step) {
        case 'NEEDS_EMAIL':
          toast.error(
            'The Provider failed to retrieve your email from your account. Without your email, we cannot verify your account.',
          );
          break;
        case 'LOGGED_IN':
          toast.success('Login successful!');
          setUser(res?.user);
          setIsLoading(false);
          if (res?.user?.role === 'USER') {
            router.push(`/dashboard/user/overview`);
          } else if (
            res?.user?.role === 'ADMIN' ||
            res?.user?.role === 'SUPER_ADMIN'
          ) {
            router.push(`/dashboard/admin/overview`);
          }
          break;
        case 'ERROR':
          console.error('Facebook login error:', res.error);
          toast.error(res.error);
          break;
      }
    };

    fetchData();
  }, [accessToken, router]);

  return (
    <div>
      <Button
        onClick={handleLogin}
        className="w-9 h-9 bg-white rounded flex items-center justify-center mt-0.5"
      >
        <FaFacebookF className="text-blue-500" />
      </Button>
    </div>
  );
}
