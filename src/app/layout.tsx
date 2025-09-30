import type { Metadata } from 'next';
import './globals.css';
import { rajdhani } from '@/assets/fonts';
import Providers from '@/providers/Providers';

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
        className={`${rajdhani.variable} antialiased bg-black text-white font-rajdhani`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
