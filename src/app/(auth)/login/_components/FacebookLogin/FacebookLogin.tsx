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
  const [modalOpen, setModalOpen] = useState(false);

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

      toast.success(
        'A link to complete the verification has been sent to your email. Please check your inbox.',
      );
      setModalOpen(false); // close modal
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Something went wrong');
    }
  };

  // Handle access token after login
  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      const res = await sendAccessToken({
        accessToken,
        provider: AuthProvider.FACEBOOK,
      });

      switch (res.step) {
        case 'NEEDS_EMAIL':
          setModalOpen(true);
          break;
        case 'NEEDS_VERIFICATION':
          toast.success(
            'A link to complete the verification has been sent to your email. Please check your inbox.',
          );
          break;
        case 'LOGGED_IN':
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

      {/* Modal for email input */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-md w-80 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">
              We failed to retrieve your email from the provider. Please enter
              your email to complete the registration with this provider. This
              is a one time process.
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEmailSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
