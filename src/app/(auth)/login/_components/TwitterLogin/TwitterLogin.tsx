'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FaTwitter } from 'react-icons/fa6';

// Generate random string
const generateRandomString = (length: number) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => chars[x % chars.length])
    .join('');
};

// SHA256 helper for PKCE
async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

// Convert array buffer to base64 URL safe string
function base64UrlEncode(arrayBuffer: ArrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  let str = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default function TwitterLogin() {
  const router = useRouter();

  const handleTwitterLogin = async () => {
    const codeVerifier = generateRandomString(64);

    // save codeVerifier to localStorage for callback
    localStorage.setItem('twitter_code_verifier', codeVerifier);

    // Create PKCE challenge
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64UrlEncode(hashed);

    const redirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_BASE_URL}/twitter/callback`,
    );
    const state = generateRandomString(16);

    const twitterAuthUrl =
      `https://twitter.com/i/oauth2/authorize?response_type=code` +
      `&client_id=${process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID}` +
      `&redirect_uri=${redirectUri}` +
      `&scope=tweet.read users.read offline.access` + // TODO: Add email scope
      `&state=${state}` +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256`;

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
