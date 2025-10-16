'use client';

import { useEffect } from 'react';

export default function TwitterCallback() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) return;

    const codeVerifier = localStorage.getItem('twitter_code_verifier') || '';

    console.log('Twitter callback:', code, codeVerifier, state);

    // 👇 you’ll eventually call your backend here:
    // await sendAccessToken({ code, codeVerifier, state });
  }, []);

  return <p>Logging in with Twitter...</p>;
}
