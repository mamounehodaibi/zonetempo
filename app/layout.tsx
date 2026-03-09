import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../index.css';
import { CartProvider } from '@/lib/cart-context';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Zonetempo — Vinyl Record Store',
  description: 'Browse over 4,200 curated vinyl records. Jazz, rock, soul, and everything in between.',
  icons: {
    icon: [
      { url: '/assets/images/zonetempo-logo.svg', type: 'image/svg+xml' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}