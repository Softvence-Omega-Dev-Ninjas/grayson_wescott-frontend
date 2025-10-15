'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FaTwitter } from 'react-icons/fa6';
import { toast } from 'sonner';

export default function TwitterLogin() {
  const [loading, setLoading] = useState(false);

  // For dev/testing: manually paste access token from Twitter OAuth2 flow
  const handleTwitterLogin = async () => {
    const accessToken = prompt('Paste your Twitter Access Token here:');
    if (!accessToken) return;

    setLoading(true);
    try {
      // TODO: update your user context / redirect
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong during Twitter login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleTwitterLogin}
      className="w-9 h-9 bg-white rounded flex items-center justify-center mt-0.5"
      disabled={loading}
    >
      {loading ? (
        <span className="animate-spin">⏳</span>
      ) : (
        <FaTwitter className="text-sky-400" />
      )}
    </Button>
  );
}
