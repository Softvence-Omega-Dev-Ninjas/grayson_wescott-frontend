/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { FaFacebookF } from 'react-icons/fa6';
import { toast } from 'sonner';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export default function FacebookLogin() {
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
          const accessToken = response.authResponse.accessToken;
          console.log('Facebook Access Token:', accessToken);

          // TODO: send accessToken to your backend if you want to create/link user
          // axios.post('/api/auth/social', { provider: 'FACEBOOK', accessToken });
        } else {
          toast.error('Facebook login cancelled or failed.');
        }
      },
      { scope: 'email,public_profile' }, // permissions you need
    );
  };

  return (
    <Button
      onClick={handleLogin}
      className="w-9 h-9 bg-white rounded flex items-center justify-center mt-0.5"
    >
      <FaFacebookF className="text-blue-500" />
    </Button>
  );
}
