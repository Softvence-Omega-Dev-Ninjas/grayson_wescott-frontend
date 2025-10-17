'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FaTwitter } from 'react-icons/fa6';
import { toast } from 'sonner';

export default function TwitterLogin() {
  const router = useRouter();

  const handleTwitterLogin = async () => {
    // Call backend to get request token & secret
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/auth-social/request-login`,
    );
    const result = await res.json();

    if (!res.ok) {
      console.error('Twitter login failed', result);
      toast.error('Twitter login failed.');
      return;
    }

    console.log('Result', result);
    const data = result?.data;

    if (!data?.url || !data?.oauthToken || !data?.oauthTokenSecret) {
      console.error('Twitter login failed', data);
      return;
    }

    // Save the oauth_token_secret to localStorage to use in callback
    localStorage.setItem('twitter_oauth_token_secret', data.oauthTokenSecret);

    const twitterAuthUrl = result?.data?.url;

    router.push(twitterAuthUrl);
  };

  return (
    <Button
      onClick={handleTwitterLogin}
      className="w-9 h-9 bg-white rounded flex items-center justify-center mt-0.5"
    >
      <FaTwitter className="text-sky-400" />
    </Button>
  );
}
