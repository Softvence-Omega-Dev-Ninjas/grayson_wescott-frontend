'use client';

import useUser from '@/hooks/useUser';
import { twitterLogin } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function TwitterCallback() {
  const router = useRouter();
  const { setUser, setIsLoading } = useUser();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const oauthToken = searchParams.get('oauth_token');
    const oauthVerifier = searchParams.get('oauth_verifier');
    const oauthTokenSecret = localStorage.getItem('twitter_oauth_token_secret');

    console.log('oauthToken', oauthToken);
    console.log('oauthTokenSecret', oauthTokenSecret);
    console.log('oauthVerifier', oauthVerifier);

    if (!oauthToken || !oauthVerifier || !oauthTokenSecret) {
      toast.error('Twitter login failed. Missing required tokens.');
      return;
    }

    const data = { oauthToken, oauthVerifier, oauthTokenSecret };

    const fetchData = async () => {
      try {
        const res = await twitterLogin(data);

        switch (res.step) {
          case 'NEEDS_EMAIL':
            toast.error(
              'Twitter did not provide your email. Please provide it to continue.',
            );
            break;
          case 'LOGGED_IN':
            toast.success('Login successful!');
            setUser(res.user);
            setIsLoading(false);

            if (res.user.role === 'USER') {
              router.push('/dashboard/user/overview');
            } else {
              router.push('/dashboard/admin/overview');
            }
            break;
          case 'ERROR':
            toast.error(res.error);
            break;
        }
      } catch (err) {
        console.error(err);
        toast.error('Twitter login failed.');
      }
    };

    fetchData();
  }, [router, setUser, setIsLoading]);

  return <p>Logging in with Twitter...</p>;
}
