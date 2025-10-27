import { rajdhani } from '@/assets/fonts';
import Providers from '@/providers/Providers';
import { getCurrentUser } from '@/services/auth';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Curbon Engines',
  description: 'Curbon Engines - Fitness Coaching & Programs',
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser(); // server action
  const token = user?.accessToken || null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rajdhani.variable} antialiased bg-black text-white font-rajdhani max-w-screen overflow-x-hidden`}
      >
        <Providers token={token}>{children}</Providers>
      </body>
    </html>
  );
}
