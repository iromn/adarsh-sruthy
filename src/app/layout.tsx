import type { Metadata, Viewport } from 'next';
import './globals.css';
import MusicPlayer from '@/components/MusicPlayer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Adarsh & Sruthy — Wedding Invitation',
  description: 'You are cordially invited to celebrate the union of Adarsh and Sruthy. Discover the details of our traditional Kerala wedding and reception, view our gallery, and RSVP here.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
