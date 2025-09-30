import localFont from 'next/font/local';
export const rajdhani = localFont({
  src: [
    { path: './Rajdhani-Light.woff2', weight: '300', style: 'normal' },
    { path: './Rajdhani-Regular.woff2', weight: '400', style: 'normal' },
    { path: './Rajdhani-Medium.woff2', weight: '500', style: 'normal' },
    { path: './Rajdhani-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './Rajdhani-Bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  fallback: ['system-ui', 'Arial'],
  variable: '--font-rajdhani', // exposes a CSS variable you can map in Tailwind
  preload: true, // keep true for critical fonts
});
