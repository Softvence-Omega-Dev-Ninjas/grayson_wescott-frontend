import { rajdhani } from '@/assets/fonts';
import Providers from '@/providers/Providers';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Curbon Engines',
  description: 'Curbon Engines - Fitness Coaching & Programs',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rajdhani.variable} antialiased bg-black text-white font-rajdhani max-w-screen overflow-x-hidden`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
