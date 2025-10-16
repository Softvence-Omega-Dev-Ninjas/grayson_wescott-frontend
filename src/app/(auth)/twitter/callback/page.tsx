'use client';

import useUser from '@/hooks/useUser';
import { twitterLogin } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function TwitterCallback() {
  const router = useRouter();

  const [data, setData] = useState({
    code: '',
    codeVerifier: '',
  });

  const { setUser, setIsLoading } = useUser();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (!code) return;

    const codeVerifier = localStorage.getItem('twitter_code_verifier') || '';

    console.log('Code & Code Verifier', code, codeVerifier);

    setData({ code, codeVerifier });
  }, []);

  useEffect(() => {
    if (!data.code || !data.codeVerifier) return;

    const fetchData = async () => {
      const res = await twitterLogin(data);

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
  }, [data, router]);

  return <p>Logging in with Twitter...</p>;
}
